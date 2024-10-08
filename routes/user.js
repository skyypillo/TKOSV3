import express from "express";
import { userDB } from "../db/connection.js";
import { ObjectId } from "mongodb";
import { hashPassword, comparePasswords } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
// import verifyToken from "../middleware/verifyToken.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ############################################ SIGN UP #############################################################
// This section will help you create a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    let collection = await userDB.collection("users");

    // Check if name was entered
    if (!username) {
      console.log("username is required");
      return res.status(400).json({ error: "username is required" });
    }

    const exist_name = await collection.findOne({ username });
    if (exist_name) {
      console.log("Username is already taken");
      return res.status(400).json({
        error: "Username is already taken",
      });
    }

    // Check email (There can't be multiple of the same email, so check if it is registered already)
    // finding it email is in the database
    const exist_email = await collection.findOne({ email });
    if (exist_email) {
      console.log("Account with this email already exists");
      return res.status(400).json({
        error: "Account with this email already exists",
      });
    }

    // Check if password is good
    if (!password || password.length < 6) {
      console.log(
        "Password is required and should be at least be 6 characters long"
      );
      return res.status(400).json({
        error:
          "Password is required and should be at least be 6 characters long",
      });
    }

    // Check if confirm password matches the password
    if (password != confirmpassword) {
      console.log("Confirm password does not match the password");
      return res.status(400).json({
        error: "Confirm password does not match the password",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    let newUser = {
      username,
      email,
      password: hashedPassword,
    };

    let result = await collection.insertOne(newUser);

    return res.status(200).json({ message: "Sign up successful", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering in user" });
  }
});

// ############################################ LOG IN #############################################################
// This section will help you login in a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let collection = await userDB.collection("users");

    // Check if user exists
    const user = await collection.findOne({ email });

    if (!user) {
      console.log("Incorrect password or email");
      return res.status(400).json({
        error: "Incorrect password or email",
      });
    }

    // check if password match
    const match = await comparePasswords(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userId: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 }
      );
      res
        .cookie("token", token)
        .status(200)
        .json({ message: "Login successful", token });
    } else {
      console.log("Incorrect password or email");
      res.status(400).json({
        error: "Incorrect password or email",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in user" });
  }
});

// ############################################ LOG OUT #############################################################
// This section will help you log out a user
router.get("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
});

// ############################################ PROFILE #############################################################
// This section will help you log out a user
router.get("/profile", async (req, res) => {
  // Put this try catch ###
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Token expired");
          res.clearCookie("token");
          return res
            .status(401)
            .json({ error: "Session expired, please log in again" });
        }
        throw err;
      }
      res.json(user);
    });
  } else {
    console.log("NO TOKEN");
  }
});

// ############################################ FORGOT PASSWORD #############################################################
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    let collection = await userDB.collection("users");
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Email User not found",
      });
    }

    const passtoken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 5,
    });

    // res.cookie("passtoken", passtoken).json(user);

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n

      http://localhost:5173/reset/${passtoken}

      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // http://localhost:5050/reset/${token}\n\n
    // ${passtoken}

    // transporter.sendMail(mailOptions, (err, response) => {
    //   if (err) {
    //     console.error("There was an error: ", err);
    //   } else {
    //     res.status(200).json({ message: "Recovery email sent" });
    //   }
    // });

    console.log("EMAIL SENT TO " + user.email + "TOKEN: " + { passtoken });
    console.log(`http://localhost:5173/reset/${passtoken}\n\n`);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while sending OTP" });
    console.log(error);
  }
});

// ############################################ RESET PASSWORD #############################################################
router.patch("/resetpassword", async (req, res) => {
  try {
    let collection = await userDB.collection("users");

    const { resettoken, newpassword } = req.body;

    console.log(resettoken);

    let decoded = null;

    jwt.verify(resettoken, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({ error: "Reset token expired" });
        }
        return res.status(400).json({ error: "Invalid token" });
      }
      decoded = user;
    });

    // Ensure the JWT verification is done before continuing
    if (decoded == null) {
      console.log("Reset token expired");
      return;
    }

    let email = decoded.email;

    const user = await collection.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    }

    const match = await comparePasswords(newpassword, user.password);
    if (match) {
      console.log("Password cannot be the same as the previous password");
      return res.status(400).json({
        error: "Password cannot be the same as the previous password",
      });
    }

    // Check if password is good
    if (!newpassword || newpassword.length < 6) {
      console.log(
        "Password is required and should be at least 6 characters long"
      );
      return res.status(400).json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    const hashedNewPassword = await hashPassword(newpassword);
    user.password = hashedNewPassword;

    console.log(hashedNewPassword);

    const updates = {
      $set: {
        username: user.username,
        email: user.email,
        password: hashedNewPassword,
      },
    };

    const query = { _id: new ObjectId(user._id) };

    await collection.updateOne(query, updates);
    console.log("Reset password successful");
    // destroy or clear the resettoken here
    res.status(200).json({ message: "Reset password successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error });
  }
});

export default router;

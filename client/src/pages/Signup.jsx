import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  async function registerUser(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      response = await fetch("http://localhost:5050/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      const result = await response.json();

      console.log("Response JSON:", result); // Log the response for debugging

      if (!response.ok) {
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.error(`HTTP error! status: ${response.status}`);
        }
        return;
      } else {
        navigate("/login");
      }

      // Handle successful login here
      toast.success("Sign up successful!");
      // Navigate to the desired page, e.g., navigate("/dashboard");
    } catch (error) {
      console.log("A problem occurred with your fetch operation: ", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div className=" flex items-center h-screen w-full pt-20">
      <div className=" w-1/2 h-full p-8">
        <div className=" w-full h-full bg-blue-300 rounded-lg flex flex-col items-center justify-center">
          <h1 className=" mb-16">Create Account</h1>
          <form className=" w-2/3 flex flex-col" onSubmit={registerUser}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
              type="text"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="confirm password"
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
              onChange={(e) =>
                setForm({ ...form, confirmpassword: e.target.value })
              }
            />
            <input
              type="submit"
              value="SIGN UP"
              className=" w-full py-2 my-6 bg-black text-white rounded-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

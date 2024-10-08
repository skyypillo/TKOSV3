import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const loginuser = { ...data };

    try {
      let response;
      response = await fetch("http://localhost:5050/user/login", {
        method: "POST",
        credentials: "include", // Ensure cookies are included
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginuser),
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
        navigate("/");
        window.location.reload();
        // toast.success("Login successful!");
      }
    } catch (error) {
      console.log("A problem occurred with your fetch operation: ", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className=" flex items-center h-screen w-full pt-20">
      <div className=" w-1/2 h-full p-8">
        <div className=" w-full h-full bg-blue-300 rounded-lg flex flex-col items-center justify-center">
          <h1 className=" mb-16">Welcome</h1>
          <form className=" w-2/3 flex flex-col" onSubmit={loginUser}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Link to="/forgotpassword" className=" self-end">
              <p>Forgot password</p>
            </Link>
            <input
              type="submit"
              value="LOGIN"
              className=" w-full py-2 my-6 bg-black text-white rounded-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

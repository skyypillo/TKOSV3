import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      response = await fetch("http://localhost:5050/user/forgotpassword", {
        method: "POST",
        credentials: "include", // Ensure cookies are included
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      console.log("Response JSON:", result); // Log the response for debugging

      if (!response.ok) {
        if (result.error) {
          toast.error(result.error);
          console.log(result.error);
        } else {
          toast.error(`HTTP error! status: ${response.status}`);
          console.log(response.status);
        }
        return;
      } else {
        toast.success("OTP sent successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log("A problem occurred with your fetch operation: ", error);
      toast.error("Error sending recovery email");
    }
  };

  return (
    <div className=" flex items-center h-screen w-full pt-20">
      <div className=" w-1/2 h-full p-8">
        <div className=" w-full h-full px-10 bg-blue-300 rounded-lg flex flex-col items-center justify-center">
          <h1 className=" mb-16">Forgot Password</h1>
          <form className=" w-2/3 flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className=" w-full py-2 my-6 bg-black text-white rounded-full"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

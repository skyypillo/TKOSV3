import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newpassword, setPassword] = useState("");
  const { passtoken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      response = await fetch("http://localhost:5050/user/resetpassword", {
        method: "PATCH",
        credentials: "include", // Ensure cookies are included
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resettoken: passtoken,
          newpassword: newpassword,
        }),
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
        toast.success("Password reset successfully!");
      }

      console.log(passtoken);
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
      toast.error("Error reseting new password.");
    }
  };

  return (
    <div className=" flex items-center h-screen w-full pt-20">
      <div className=" w-1/2 h-full p-8">
        <div className=" w-full h-full px-10 bg-blue-300 rounded-lg flex flex-col items-center justify-center">
          <h1 className=" mb-16">Reset Password</h1>
          <form className=" w-2/3 flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" w-full py-2 px-6 my-2 rounded-full bg-transparent border-2 border-black placeholder:text-black"
            />
            <button
              type="submit"
              className=" w-full py-2 my-6 bg-black text-white rounded-full"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

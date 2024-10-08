import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:5050/user/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        // setError(
        //   "A problem occurred with your fetch operation: " + error.message
        // );
        console.log(
          "A problem occurred with your fetch operation: " + error.message
        );
      }
    }

    getData();
  }, []);

  const LogOutUser = async () => {
    try {
      let response;
      response = await fetch("http://localhost:5050/user/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("A problem occurred with your get operation: ", error);
    }
  };

  return (
    <div className=" flex items-center justify-between px-20 py-4 bg-[#fff] fixed top-0 left-0 w-full z-20">
      <p>LOGO</p>
      <ul className=" flex items-center">
        {["Home", "About", "Lessons", "Sound Bank"].map((page, i) => (
          <NavLink
            to={i == 0 ? `/` : `/${page.toLowerCase()}`}
            key={page + i.toString()}
          >
            <li className=" mx-4">
              <p>{page}</p>
            </li>
          </NavLink>
        ))}
        {userData ? (
          <li
            className=" h-full mr-1 ml-8 flex items-center justify-center bg-black text-white px-4 py-2 rounded-md"
            onClick={LogOutUser}
          >
            <p>Log out</p>
          </li>
        ) : (
          <>
            <NavLink to={"/login"} key="login">
              <li className=" h-full mr-1 ml-8 flex items-center justify-center bg-black text-white px-4 py-2 rounded-md">
                <p>Login</p>
              </li>
            </NavLink>
            <NavLink to={"/signup"} key="signup">
              <li className=" h-full mx-1 flex items-center justify-center bg-black text-white px-4 py-2 rounded-md">
                <p>Sign up</p>
              </li>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;

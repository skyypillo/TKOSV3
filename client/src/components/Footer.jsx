import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className=" bg-black w-full text-white flex px-20 py-6">
      <ul className=" flex flex-col items-center pr-20 w-1/4">
        {["Home", "About", "Lessons", "Sound Bank"].map((page, i) => (
          <NavLink
            to={i == 0 ? `/` : `/${page.toLowerCase()}`}
            key={page + i.toString()}
          >
            <li className=" my-2">
              <h6>{page}</h6>
            </li>
          </NavLink>
        ))}
      </ul>
      <div className=" flex flex-col w-3/4 items-center">
        <h2>THE KEY OF SIGHT</h2>
        <ul className=" flex w-full items-center justify-evenly px-20">
          <li>
            <p>I</p>
          </li>
          <li>
            <p>T</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

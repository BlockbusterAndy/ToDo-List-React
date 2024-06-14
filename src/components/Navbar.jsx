import React from "react";
import { CiBoxList } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className=" bg-gradient-to-r from-cyan-200 to-cyan-500 flex justify-between px-[6rem] py-4">
      <div>
        <span className=" flex items-center gap-2 text-2xl font-bold text-gray-900">Listly <CiBoxList /> </span>
      </div>
      <ul className=" flex gap-8">
        <a href="#">
          <li className=" text-base font-semibold hover:text-slate-300 hover:font-bold text-slate-900">Home</li>
        </a>
        <a href="#">
          <li className=" text-base font-semibold hover:text-slate-300 hover:font-bold text-slate-900">Your Tasks</li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;

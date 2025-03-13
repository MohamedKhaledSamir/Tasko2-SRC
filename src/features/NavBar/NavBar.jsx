import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex items-center justify-around mt-10 shadow-md pb-10 px-12 flex-wrap max-sm:gap-6">
      <h1 className="text-5xl font-bold">Tasko</h1>

      <ul className="flex items-center justify-center gap-10">
        <li>
          <Link className="text-xl" to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link className="text-xl" to={"/history"}>
            History
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

import React from "react";
import { RxCross2 } from "react-icons/rx";
import { CgMenuRightAlt } from "react-icons/cg";

export default function SidebarToggleButton({ isSidebarOpen, toggle }) {
  return (
    <button
      className="fixed top-4 right-4 z-[60] p-2 bg-white rounded-full lg:hidden"
      onClick={toggle}
    >
      {isSidebarOpen ? <RxCross2 size={24} /> : <CgMenuRightAlt size={24} />}
    </button>
  );
}

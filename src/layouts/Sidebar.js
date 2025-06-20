// /components/Sidebar/Sidebar.jsx
import React, { useEffect, useState } from "react";

import SidebarBrand from "../components/sidebar/SidebarBrand";
import SidebarMenu from "../components/sidebar/SidebarMenu";
import SidebarProfile from "../components/sidebar/SidebarProfile";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsMinimized(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMinimized = () => setIsMinimized(!isMinimized);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen ${
          isMinimized
            ? "w-24 overflow-hidden"
            : "w-52 sidebar-gradient overflow-hidden"
        } bg-white border-r border-neutral-200 dark:bg-surface-dark dark:border-border-dark transition-all duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto flex flex-col`}
      >
        <SidebarBrand isMinimized={isMinimized} onDoubleClick={toggleMinimized} />
        <SidebarMenu
          isMinimized={isMinimized}
          closeMobileSidebar={() => setIsSidebarOpen(false)}
        />
        <SidebarProfile isMinimized={isMinimized} />
      </aside>
    </>
  );
}

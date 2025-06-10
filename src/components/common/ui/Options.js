import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Pencil } from "lucide-react";

export default function DotMenu({ viewPath = "#", editPath = "#" }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 hover:bg-grey-200 rounded-full"
      >
        <MoreVertical className="h-5 w-5 text-slate-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 z-30">
          <div className="relative bg-white border border-border rounded-lg shadow-1 z-50 pt-2">
            {/* Nokh (Arrow) */}
            <div className="absolute top-0 right-3 w-3 h-3 bg-white border-t border-l border-border rotate-45 -translate-y-1/2 z-20" />

            {/* Menu Items */}
            <div className="flex flex-col ">
              <a
                href={viewPath}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-grey-200"
              >
                <Eye className="h-4 w-4" />
                View
              </a>
              <a
                href={editPath}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-grey-200"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

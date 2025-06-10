import React from 'react';
import Sidebar from '../layouts/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <Sidebar />
      <div className="flex-1 bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
        <main className="min-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
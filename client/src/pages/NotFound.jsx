import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <div className="text-6xl font-extrabold text-amber-500 mb-2">404</div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-slate-500 text-sm max-w-md mb-6">
        The page or document you requested could not be found on the Government School website portal.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-2 shadow transition"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home Page</span>
      </Link>
    </div>
  );
}

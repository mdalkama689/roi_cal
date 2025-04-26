import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 bg-slate-800/90 text-gray-400 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; {currentYear} ROI Calculator. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-1">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" />
          <span>for smarter investments</span>
        </div>
      </div>
    </footer>
  );
};
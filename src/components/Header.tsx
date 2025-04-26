import React from "react";
import { Calculator } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold text-white">ROI Calculator</h1>
        </div>
      </div>
    </header>
  );
};

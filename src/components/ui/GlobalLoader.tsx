"use client";

import React from "react";
import { useLoading } from '@/context/LoadingContext';

const GlobalLoader: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 top-0 flex items-center justify-center bg-black/50 z-[9999] overflow-hidden backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold">در حال بارگذاری...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
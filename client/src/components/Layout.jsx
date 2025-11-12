import React from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  const { screenLoading } = useSelector((state) => state.userReducer);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {screenLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {/* Global Toasts */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#1f2937", color: "#fff" },
          success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
      {children}
    </div>
  );
}

import { useEffect } from "react";

export default function LogoutDialog({ open, onClose }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md space-y-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">Logged Out</h2>
        <p className="text-gray-600">You’ve successfully logged out.</p>
        <button
          onClick={onClose}
          className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded-lg transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

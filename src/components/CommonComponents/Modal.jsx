import React from 'react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition">
      <div className="relative bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 text-xl hover:text-white"
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

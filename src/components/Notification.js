import React, { useState } from "react";

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`p-4 text-white ${getColor()} fixed top-4 right-4 rounded shadow-lg`}>
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="ml-4 text-lg font-bold"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;

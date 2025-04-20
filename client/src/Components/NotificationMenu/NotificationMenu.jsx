import React, { useState, useRef, useEffect } from "react";
import "./NotificationMenu.css";

const NotificationButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notification-container" ref={menuRef}>
      <button onClick={toggleMenu} className="notification-button">
        Notifications
      </button>
      {showMenu && (
        <div className="notification-menu">
          <div className="notification-header">Notifications</div>
          <ul className="notification-list">
            <li>Alert 1</li>
            <li>Alert 2</li>
            <li>Alert 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;

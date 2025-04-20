import React, { useState, useRef, useEffect } from "react";
import "./NotificationMenu.css";

const NotificationButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Close when clicking outside of notification menu
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

  //need a useEffect to fetch notifications from the server ask backend
  useEffect(() => {
    const fetchNotifications = async () => {
    const response = await fetch("replace with where to get notifications");
    const data = await response.json();
     //console.log(data); // Handle the notifications data debugging
    //console.error("Error fetching notifications:", error);
      }
    
    fetchNotifications();
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
            {notifications.length === 0 ? (
              <li>No new notifications</li>
            ) : (
              notifications.map((notification, index) => (
                <li key={index}>
                  {notification}
                </li>

              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;

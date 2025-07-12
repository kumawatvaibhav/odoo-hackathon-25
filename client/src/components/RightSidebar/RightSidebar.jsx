import React from "react";
import { useLocation } from "react-router-dom";
import "./RightSidebar.css";
import WidgetTags from "./WidgetTags";

const RightSidebar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <aside className="right-sidebar">
      {isHome && <WidgetTags />}
    </aside>
  );
};

export default RightSidebar;

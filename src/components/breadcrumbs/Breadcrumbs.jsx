import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  // Split the pathname into segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav style={{ padding: "10px" }}>
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to}>
            {" / "}
            {isLast ? (
              <span>{decodeURIComponent(value)}</span>
            ) : (
              <Link to={to}>{decodeURIComponent(value)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

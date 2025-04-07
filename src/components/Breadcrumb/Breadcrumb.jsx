import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs as PathNavigator } from "@material-tailwind/react";

const PagePath = () => {
  const location = useLocation();

  const route = location.pathname.split("/").filter((item) => item);

 

  return (
    <div className="p-4">
      <PathNavigator>

        {/* Home link */}
        <Link to="/" className="opacity-60">
          Home
        </Link>

        {route.map((item, index) => {
          

          const path = `/${route.slice(0, index + 1).join("/")}`;

          return (
            <Link
              key={index}
              to={path}
              className={
                index === route.length - 1 ? "opacity-100 text-blue-400" : "opacity-80"
              }
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          );
        })}
      </PathNavigator>
    </div>
  );
};

export default PagePath;

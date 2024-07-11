import React, { FC, useEffect, useState } from "react";
import "./TopAppBar.scss";

interface TopAppBarProps {
  title?: string;
  scrollEl?: string;
  centred?: boolean;
  medium?: boolean;
  large?: boolean;
  children?: React.ReactNode;
}

const TopAppBar: FC<TopAppBarProps> = ({
  title = "Page Title",
  scrollEl,
  centred = false,
  medium = false,
  large = false,
  children,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollEl) {
        setScrollY(window.scrollY);
      } else {
        const el = document.querySelector(scrollEl);
        setScrollY(el ? el.scrollTop : 0);
      }
    };

    const target = scrollEl ? document.querySelector(scrollEl) : window;
    target?.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set the scrollY state

    return () => {
      target?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollEl]);

  const barClasses = [
    "top-app-bar",
    centred ? "centred" : "",
    medium ? "medium" : "",
    large ? "large" : "",
    scrollY > 0 ? "on-scroll" : "",
  ].join(" ");

  const headlineClass = large
    ? "headline-medium"
    : medium
    ? "headline-small"
    : "title-large";

  return (
    <div className={barClasses}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.props.slot === "navigation") {
            return child;
          }
        }
        return null;
      })}
      <div className={`headline ${headlineClass}`}>{title}</div>
      <div className="actions">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.props.slot === "actions") {
              return child;
            }
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TopAppBar;

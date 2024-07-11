import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./TopAppBarItem.scss";

interface TopAppBarItemProps {
  to?: string;
  replace?: boolean;
  icon: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const TopAppBarItem: FC<TopAppBarItemProps> = ({
  to,
  replace = false,
  icon,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (to) {
      navigate(to, { replace });
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <div onClick={handleClick} className="top-app-bar-item">
      <span className="material-symbols-rounded">{icon}</span>
    </div>
  );
};

export default TopAppBarItem;

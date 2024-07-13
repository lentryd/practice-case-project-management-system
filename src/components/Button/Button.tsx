import React, { FC } from "react";
import { useNavigate } from "react-router";
import "./Button.scss";

interface ButtonProps {
  to?: string;
  replace?: boolean;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  text?: boolean;
  filled?: boolean;
  outlined?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  to,
  replace = false,
  label,
  loading = false,
  disabled = false,
  text = true,
  filled = false,
  outlined = false,
  onClick,
  children,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled || loading) return;
    if (to) {
      navigate(to, { replace });
    } else if (onClick) {
      onClick(e);
    }
  };

  const classes = [
    "btn",
    children ? "icon" : "",
    loading ? "loading" : "",
    disabled ? "disabled" : "",
    text ? "text" : "",
    filled ? "filled" : "",
    outlined ? "outlined" : "",
    !label ? "no-label" : "",
  ].join(" ");

  return (
    <div
      onClick={handleClick}
      onKeyPress={(e) => e.key === "Enter" && handleClick(e as any)}
      className={classes}
      tabIndex={0}
    >
      {children}
      {label && <span className="label-large">{label}</span>}
      <div className="state-layer">{loading && <div className="loader" />}</div>
    </div>
  );
};

export default Button;

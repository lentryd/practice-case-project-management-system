import React, { useState, useEffect, ReactNode } from "react";
import "./index.scss";

interface DialogProps {
  title?: string;
  description?: string;
  permanent?: boolean;
  modelValue: boolean;
  onModelValueChange: (value: boolean) => void;
  children: {
    icon?: ReactNode;
    body?: ReactNode;
    actions?: ReactNode;
  };
}

const Dialog: React.FC<DialogProps> = ({
  title,
  description,
  permanent = false,
  modelValue,
  onModelValueChange,
  children,
}) => {
  const [show, setShow] = useState(modelValue);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setShow(modelValue);
  }, [modelValue]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!show || e.code !== "Escape") return;
      e.preventDefault();
      setShow(false);
      onModelValueChange(false);
    };

    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, [show, onModelValueChange]);

  const onMask = () => {
    if (permanent) {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    } else {
      setShow(false);
      onModelValueChange(false);
    }
  };

  return (
    <>
      {show && (
        <div className="dialog" onClick={onMask}>
          <div
            className={`dialog-content ${clicked ? "maskClick" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {!!children.icon && children.icon}
            {title && <span className="headline-small">{title}</span>}
            <div className="body">
              {description && (
                <span className="body-medium">{description}</span>
              )}
              {children.body && <div>{children.body}</div>}
            </div>
            <div className="actions">
              {!!children.actions && children.actions}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;

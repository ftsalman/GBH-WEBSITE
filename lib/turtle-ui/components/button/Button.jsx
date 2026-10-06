import PropTypes from "prop-types";

// Utils 

import { buttonVariants } from "./buttonVariants";
  
// Styles

import "./button.css";

export const Button = ({
  size = "default", 
  variant = "default",
  className = "",
  children = null,
  onClick = undefined,
  ref = null, 
  ...props
}) => (
  <button 
    ref={ref}
    className={buttonVariants({ size, variant, className }) + " tui-btn group"}
    onClick={onClick}
    type="button"
    role="button"
    {...props}
  >
    <span className="tui-btn-window">
      <span className="tui-btn-content">{children}</span>
      <span className="tui-btn-content tui-btn-content--hover" aria-hidden="true">
        {children}
      </span>
    </span>
  </button>
);

Button.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  ref: PropTypes.any,
};

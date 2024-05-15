import React from "react";

const IconComponent = ({
  Icon,
  classes,
  onClick,
  onMouseOver,
  onMouseLeave,
  style,
}) => {
  return (
    <i
      onClick={onClick}
      style={style}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className={classes}>
      <Icon />
    </i>
  );
};

export default IconComponent;

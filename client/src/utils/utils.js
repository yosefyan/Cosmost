export const centerItem = (...flexProps) => {
  const [justify, items] = flexProps;
  return `flex ${justify || "justify-center"} ${items || "items-center"}`;
};

export const grid = (...gridProps) => {
  const [column, row, justify] = gridProps;
  return `grid ${column || ""} ${row || ""} ${
    justify || "justify-items-center"
  }`;
};

export const cardWidthHeight = () => "w-[30vw] h-[100vh]";

export const gradient = (isText, ...colors) => {
  const [fst, snd] = colors;
  return `${
    isText ? "bg-clip-text text-transparent" : ""
  } bg-gradient-to-tl ${fst} ${snd}`;
};

export const inputStyles = (bgColor, ...sizes) => {
  const [width, height, borderSize, borderColor] = sizes;
  return `${width} ${height} ${borderSize} ${borderColor} ${bgColor}`;
};

export const triangleStyles = (upsideDown, height, color) => {
  return `w-0 h-0  border-l-transparent ${
    upsideDown ? "border-b-[7rem]" : `${height || "border-t-[7rem] "} `
  } ${color || ''} ${
    upsideDown ? `border-b-red-500/15` : `border-t-fuchsia-500/15`
  } border-r-transparent`;
};

export const buttonStyles = (fontSize) => {
  return `w-[25vw] text-center p-4 ${
    fontSize || "text-4xl"
  } text-white/25 font-black tracking-widest cursor-pointer select-none hover:scale-95 transition-all`;
};

export const titleStyles = (fontSize) => {
  return `${fontSize || "text-4xl"} text-center font-black tracking-widest`;
};

export const labelStyles =
  "text-6xl text-white/50 absolute transition-all blur-3xl scale-0 tShadow";

export const shadowEffects = `rotateSpace tShadow bg-sky-500/5 shadow-lg rounded-full shadow-white/25 transition-all`;

export const iconStyles = (size) => {
  return `${size || "text-5xl"} font-black cursor-pointer`;
};

export const coinsGemsColors = (orange) => {
  return orange
    ? "bg-orange-500/10 text-orange-500/50 shadow-orange-500/50"
    : "bg-green-500/10 text-green-500/50 shadow-green-500/50";
};

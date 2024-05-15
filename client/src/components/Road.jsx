import { useEffect, useState, useRef, memo } from "react";
import { centerItem } from "../utils/utils";
import { textColors } from "../constants/colorsData";

const Road = ({ classes, deg, position, colors, Unit, fixRotate, index }) => {
  let [move, setMove] = useState(0);

  const fullPath = useRef(null);

  useEffect(() => {
    let full = fullPath.current?.offsetHeight;
    let interval = setInterval(() => {
      setMove((prev) => (prev <= -full ? -full : prev - 1));
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={fullPath}
      className={`${centerItem()} ${
        classes ? classes : " w-[40%] h-[100vh] absolute"
      } hidden lg:flex drop-shadow-[0_0_1rem_gray] ${colors} ${deg} ${position} shadow-lg shadow-black`}
    >
      <div className="w-[85%] h-full border-x-4 border-dashed border-white/10"></div>
      <div
        className={`${centerItem(
          "",
          "items-start"
        )} transition-all w-full h-full absolute`}
      >
        <i
          style={{ bottom: `${index * 300 + move}px` }}
          className={`text-[35rem] opacity-10 shadow-md shadow-gray ${fixRotate} ${
            index === 0
              ? textColors.PRIMARY
              : index === 1
              ? textColors.SECONDARY
              : index === 2
              ? textColors.TERTIARY
              : "text-gray-500/50"
          } relative transition-all text-5xl`}
        >
          <Unit />
        </i>
      </div>
    </div>
  );
};

export default memo(Road);

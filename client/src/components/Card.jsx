import { cardWidthHeight, centerItem, gradient } from "../utils/utils";
import { useEffect, useState, useRef, memo } from "react";
import getRandomReview from "../helpers/getRandomReview";
import { FaTag } from "react-icons/fa";
import { gradientColors } from "../constants/colorsData";

const Card = ({ rotate, title, which }) => {
  const [usersReview, setUsersReview] = useState([]);
  const [theNum, setTheNum] = useState(0);
  const ContainerScroll = useRef(null);

  useEffect(() => {
    let interval = setInterval(() => {
      setUsersReview((prevUsersReview) => {
        const { person, review, planet, whyUs } = getRandomReview();

        return which == "reviews"
          ? [...prevUsersReview, { person, review }]
          : [...prevUsersReview, { planet, whyUs }];
      });
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTheNum((prev) => (usersReview.length > 4 ? prev - 100 : 0));
    usersReview.length == 30 && setUsersReview([]);
  }, [usersReview]);

  return (
    <div
      className={`${centerItem('justify-evenly')} h-full ${rotate} max-lg:rotate-0 rounded-2xl fly flex-col gap-2`}>
      <p
        className={`text-7xl ${gradient(
          true,
          gradientColors.PRIMARY
        )} tracking-widest font-extrabold tShadow`}>
        {title}
      </p>
      <div
        className={`w-[90%] lg:w-[30vw] ${cardWidthHeight()} overflow-y-hidden flex-col justify-evenly h-[62vh] rounded-lg p-4 shadow-2xl`}>
        {usersReview.length == 0 ? (
          <div className={`${centerItem()} h-full`}>
            <p
              className={` opacity-50 text-5xl h-full w-[10%] h-[10%] border-y-4 border-gray-500 rounded-full animate-spin ${centerItem()}`}></p>
          </div>
        ) : (
          usersReview?.map((user, i) => {
            let Icon = user.person || user.planet;
            return (
              <div
                key={`review${i}`}
                ref={ContainerScroll}
                className={`userReview transition-all min-h-[20vh] my-4 p-2 ${centerItem()} gap-4 even:bg-orange-500/5 even:text-cyan-300/50 odd:text-orange-300/50 odd:bg-blue-500/5 rounded-lg transition-all`}
                style={{
                  transform: `translateY(${theNum}%) scale(.9)`,
                }}>
                <p className="text-4xl rounded-lg text-3.5xl p-2 shadow-lg">
                  {<Icon />}
                </p>
                <p
                  className={`text-white-500 w-full text-3xl lg:text-[1.25rem] xl:text-[1.7rem] ${centerItem()} bg-black/25 h-[20vh] p-4 leading-10 font-bold`}>
                  {user.review || user.whyUs}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default memo(Card);

import { centerItem } from "../../../utils/utils";
import shopData from "../../../constants/shopData";
import randomIMG from "../../../assets/faviconCosmost.png";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";

function MuseumGlass({ data, classes }) {
  return (
    <div
      className={`cardArea hidden lg:flex ${
        !classes ? "w-full h-[60vh] lg:h-full" : classes
      } ${centerItem("justify-between")}`}
    >
      <div
        className={`insideArea shadow-lg shadow-black relative w-full ${centerItem()}`}
      >
        <IconComponent
          Icon={iconsData[data || "MdError"]}
          classes={`inside text-white text-8xl ${centerItem()}`}
        />
        <div className={`lasers absolute w-full h-full ${centerItem()}`}>
          {shopData.shopDialog.museumData.lasers.map((laser, index) => {
            return (
              <p className="w-full h-full" key={`shopDataShopDialogMuseumDataLasersMuseumGlass${index}`}>
                {laser}
              </p>
            );
          })}
        </div>
      </div>
      <div className={`tableArea relative w-full ${centerItem()}`}>
        {shopData.shopDialog.museumData.tableParts.map((table, index) => {
          return (
            <p
              className={`w-[20%] primaryGradient bRadius relative ${centerItem()}`}
              key={`shopDataShopDialogMuseumDataTablePartsMuseumGlass${index}`}
            >
              {table}
              {index === 1 && (
                <img
                  src={randomIMG}
                  className="w-[15%] rounded-full h-fit bgImage absolute"
                />
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default MuseumGlass;

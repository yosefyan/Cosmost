import { useState, useRef, useEffect } from "react";
import { bgColors, bordersColors, textColors } from "../constants/colorsData";
import { centerItem, titleStyles } from "../utils/utils";
import Eye from "../components/Eye";
import EscalatorButtons from "../components/EscalatorButtons";
import { useSelector } from "react-redux";
import dynamicAxiosMethod from "../helpers/dynamicAxiosMethod";
import toastifyHelper, { toastifyStatuses } from "../helpers/toastifyHelper";
import normalizeData from "../utils/normalizeData";

const useGenerateInputs = ({
  array,
  fullContainer,
  titles,
  eachContainer,
  submitRequest,
  toastifyData,
  transferRoute,
  initialRequest = false,
  justInput = false,
  anyAdditional = false,
  filledInData = false,
  normalize = false,
  secondReq = false,
}) => {
  const { errors } = useSelector((state) => state.globalReducer);
  const { method, endpoint, shouldToken } = initialRequest;
  const [initialData, setinitialData] = useState([]);
  const roadContainer = useRef(null);
  const [shouldReveal, setShouldReveal] = useState(false);
  const [inputs, setInputs] = useState(
    array.reduce((a, b) => {
      a[b] = "";
      return a;
    }, {})
  );
  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      ...normalizeData(filledInData)[normalize],
    }));
  }, [filledInData]);

  const [selectedFile, setSelectedFile] = useState(null);

  initialRequest &&
    useEffect(() => {
      try {
        const initialReq = async () => {
          const { data } = await dynamicAxiosMethod({
            method,
            endpoint,
            shouldToken,
          });
          setinitialData(data);
          !initialRequest.dontAffectInputs &&
            setInputs((prev) => {
              const updatedInputs = { ...prev };
              Object.keys(updatedInputs).forEach((key) => {
                const normalizedData = normalizeData(data[0])["Profile"];
               
                if (normalizedData[key] !== undefined) {
                  updatedInputs[key] =
                    key.trim() === "Date_Of_Birth"
                      ? new Date(normalizedData[key])
                          .toISOString()
                          .split("T")[0]
                      : normalizedData[key];
                }
              });

              return updatedInputs;
            });
        };
        initialReq();
      } catch (error) {
        setinitialData([]);
        error.response &&
          toastifyHelper({
            status: toastifyStatuses.error,
            message: error.response.data,
          });
        throw new Error(error);
      }
    }, []);

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        handleInputs(e, key);
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        alert("Please select an image file.");
      }
    }
  };

  const handleInputs = (e, key) => {
    setInputs({
      ...inputs,
      [key]:
        e.target.files === null || e.target.files === undefined
          ? e.target.value
          : URL.createObjectURL(e.target.files[0]),
    });
  };

  const clearInputs = () => {
    setInputs((prev) => {
      const newInputs = {};
      Object.keys(prev).forEach((key) => {
        newInputs[key] = "";
      });
      return { ...prev, ...newInputs };
    });
  };

  return {
    selectedFile,
    clearInputs,
    inputs,
    data: (
      <div
        style={{ zIndex: 999999999 }}
        ref={roadContainer}
        className={`w-full relative overflow-hidden ${fullContainer}`}
      >
        {Object.entries(inputs).map(([key, value], i) => {
          const fixedKey = key;
          return (
            <div key={`inputsCustomHook${i}`} className={`${eachContainer}`}>
              {justInput ? (
                <>
                  {key === "Textarea" ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleInputs(e, key)}
                      required={true}
                      className={`w-full h-[80%] resize-none p-4 border-x-8 border-l-fuchsia-500/50 border-r-fuchsia-500/50 leading-[1.6rem] h-[75%] tShadow bg-black/50 ${textColors.PRIMARY}`}
                      placeholder="Post here anything..."
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                    ></textarea>
                  ) : key === "Upload" ? (
                    <input
                      onChange={(e) => handleFileChange(e, key)}
                      type="file"
                      accept="image/*"
                      placeholder="Upload Image"
                      className={`${centerItem("")} text-center w-full h-full ${
                        textColors.SECONDARY
                      } text-2xl ${bgColors.PRIMARY} rounded-[20px]`}
                    />
                  ) : (
                    <div
                      className={`w-[95%] m-auto ${centerItem()} ${
                        !anyAdditional.classes
                          ? "flex-col"
                          : anyAdditional.classes
                      } gap-4 ${i === 0 ? "p-4" : ""}`}
                    >
                      <h1 className="tShadow">{titles[i]}</h1>
                      <input
                        value={value}
                        onChange={(e) => handleInputs(e, key)}
                        required={true}
                        type="text"
                        placeholder={`Please enter ${
                          titles[i].toLowerCase() || "text here..."
                        }`}
                        className={` ${centerItem(
                          ""
                        )} text-center p-2 text-white/60 text-1xl ${
                          value && value.length > 15 ? "lg:text-1xl" : "lg:text-2xl"
                        } ${i === 0 ? "w-full" : "w-[80%]"} ${
                          bgColors.PRIMARY
                        } rounded-[20px]`}
                      />
                      {anyAdditional.html}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1
                    className={`${
                      bgColors.SECONDARY
                    } hover:text-gray-500/25 p-4 w-[80%] transition-all rounded-[4rem] ${titleStyles(
                      titles[i].length > 5 ? "text-4xl" : "text-6xl"
                    )} ${textColors.PRIMARY}`}
                  >
                    {fixedKey}
                  </h1>
                  <div className={`${centerItem()} w-[80%] flex-col`}>
                    <div className={`w-[80%] ${centerItem("justify-evenly")}`}>
                      <Eye neededInput={inputs[key]} />
                      <Eye neededInput={inputs[key]} />
                    </div>
                    <input
                      className={`bg-transparent p-4 w-[80%] lg:w-[90%] text-1xl lg:text-3xl p-4 shadow-cyan-500 text-center border-b-8 focus:outline-none focus:scale-[1.2] transition-all ${
                        inputs[key] ? "" : "rounded-[25%]"
                      } ${
                        i % 2 === 0
                          ? `${bordersColors.PRIMARY} ${textColors.SECONDARY}`
                          : `${bordersColors.PRIMARY} ${textColors.SECONDARY}`
                      }`}
                      placeholder={`Please enter ${fixedKey.toLowerCase()}...`}
                      minLength={15}
                      key={`input${i}`}
                      value={
                        selectedFile && key === "Profile_Picture"
                          ? URL.createObjectURL(selectedFile)
                          : value
                      }
                      onChange={(e) => handleInputs(e, key)}
                      type={
                        key.toLowerCase().includes("password")
                          ? "password"
                          : /Date/g.test(key)
                          ? "date"
                          : "text"
                      }
                    />
                    <div className={`h-[10vh] ${centerItem()}`}>
                      <h1 className={`${textColors.DENY} text-1xl text-center lg:text-2xl`}>
                        {errors[i] && errors[i][key]}
                      </h1>
                    </div>
                  </div>
                  {(key === "Profile_Picture" || key === "Upload") && (
                    <>
                      <h1
                        className={`${titleStyles("text-4xl")} ${
                          textColors.DENY
                        }`}
                      >
                        OR SELECT FILE
                      </h1>
                      <input
                        type="file"
                        accept="image/*"
                        placeholder="Upload Image"
                        onChange={(e) => handleFileChange(e, key)}
                        className={`${centerItem("justify-evenly")} p-4 ${
                          textColors.SECONDARY
                        } text-2xl ${bgColors.PRIMARY} rounded-[20px]`}
                      />
                    </>
                  )}
                  <h3
                    style={{ lineBreak: "anywhere" }}
                    className={`leading-loose ${titleStyles(
                      "text-1xl lg:text-3xl"
                    )} w-[70%] ${textColors.TERTIARY}`}
                  >
                    {titles[i]}
                    <span
                      onClick={() => setShouldReveal((prev) => !prev)}
                      className={`w-full block ${titleStyles(
                        value.length > 4 ? "text-[1rem]" : "text-3xl"
                      )} ${textColors.PRIMARY}`}
                    >
                      {key.toLowerCase().includes("password") && !shouldReveal
                        ? "$@%#@%#@%"
                        : value || "Unknown Identity"}
                    </span>
                  </h3>
                  <EscalatorButtons
                    initialRequest={initialRequest}
                    transferRoute={transferRoute}
                    selectedFile={selectedFile}
                    submitRequest={{ ...submitRequest, data: inputs }}
                    toastifyData={toastifyData}
                    inputs={inputs}
                    clearInputs={clearInputs}
                    genericIndex={i}
                    container={roadContainer}
                    secondReq={secondReq}
                    initialData={initialData}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    ),
  };
};
export default useGenerateInputs;

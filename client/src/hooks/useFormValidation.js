import { useEffect } from "react";
import dynamicJoi from "../validation/dynamicJoi";
import useDynamicDispatch from "./useDynamicDispatch";

const useFormValidation = ({ inputs, specialData }) => {
  const dynamicDispatch = useDynamicDispatch();
  useEffect(() => {
    const schema = dynamicJoi({ ...inputs, ...specialData });
    const result = schema.validate(inputs || specialData);
    dynamicDispatch(
      "SET_ERRORS",
      {
        errors: Object.keys(inputs || specialData).map((key) =>
          result.error && result.error.details[0].context.key === key
            ? {
                [key]: result.error.details[0].message || "",
              }
            : { [key]: "" }
        ),
      }
      
    );
  }, [inputs]);
};

export default useFormValidation;

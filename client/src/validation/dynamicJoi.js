import Joi from "joi";

const dynamicJoi = (dataObj) => {
  let fixedObj = Object.fromEntries(
    Object.entries(dataObj).map(([key, value]) => {
      return [
        key,
        {
          type: value.type || "string",
          min: value.min || 3,
          max: value.max || 256,
          required: value.required || true,
          regex: value.regex || null,
        },
      ];
    })
  );

  let schema = {};

  Object.entries(fixedObj).forEach(([key, value]) => {
    let logic =
      value.type === "string"
        ? Joi.string()
        : value.type === "number"
        ? Joi.number()
        : value.type === "url"
        ? Joi.string().uri()
        : value.type === "date"
        ? Joi.date()
        : Joi.any();

    if (value.min) logic = logic.min(value.min);
    if (value.max) logic = logic.max(value.max);
    if (key === "Repeat_Password") logic = logic.valid(Joi.ref("Password"));
    if (value.regex) logic = logic.pattern(value.regex);
    logic = logic.messages({
      "string.empty": `${key} is not allowed being empty.`,
      "string.min": `${key} should not be less than ${value.min} characters`,
      "string.max": `${key} should not be more than ${value.max} characters`,
      "string.uri": `${key} must be a valid URL.`,
      "string.pattern.base": `Your current ${key.toLowerCase()} is not strong/valid.`,
      "any.only": "Must match your previous password.",
    });
    if (value.required) logic = logic.required();
    schema[key] = logic;
  });

  return Joi.object(schema);
};

export default dynamicJoi;

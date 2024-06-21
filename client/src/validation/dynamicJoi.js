import Joi from "joi";

const dynamicJoi = (dataObj) => {
  let fixedObj = Object.fromEntries(
    Object.entries(dataObj).map(([key, value]) => {
      return [
        key,
        {
          type: value.type || "string",
          min: value.min !== undefined ? value.min : 3,
          max: value.max !== undefined ? value.max : 256,
          required: value.required !== undefined ? value.required : true,
          regex: value.regex || null,
        },
      ];
    })
  );

  let schema = {};

  Object.entries(fixedObj).forEach(([key, value]) => {
    let logic;

    switch (value.type) {
      case "string":
        logic = Joi.string();
        if (value.min !== undefined) logic = logic.min(value.min);
        if (value.max !== undefined) logic = logic.max(value.max);
        if (value.regex) logic = logic.pattern(value.regex);
        break;
      case "number":
        logic = Joi.number();
        if (value.min !== undefined) logic = logic.min(value.min);
        if (value.max !== undefined) logic = logic.max(value.max);
        break;
      case "url":
        logic = Joi.string().uri();
        break;
      case "date":
        logic = Joi.date().iso().greater("1900-01-01").less("now");
        break;
      default:
        logic = Joi.any();
        break;
    }

    if (key === "Repeat_Password") {
      logic = Joi.valid(Joi.ref("Password")).messages({
        "any.only": "Must match your previous password.",
      });
    }

    logic = logic.messages({
      "string.empty": `${key} is not allowed being empty.`,
      "string.min": `${key} should not be less than ${value.min} characters`,
      "string.max": `${key} should not be more than ${value.max} characters`,
      "string.uri": `${key} must be a valid URL.`,
      "string.pattern.base": `Your current ${key.toLowerCase()} is not strong/valid.`,
      "number.min": `${key} should not be less than ${value.min}`,
      "number.max": `${key} should not be more than ${value.max}`,
      "date.less": `${key} must be in the past`,
      "date.greater": `${key} must be after January 1, 1900`,
      "date.format": `${key} must be in ISO format (YYYY-MM-DD)`,
    });

    if (value.required) {
      logic = logic.required();
    }

    schema[key] = logic;
  });

  return Joi.object(schema);
};

export default dynamicJoi;

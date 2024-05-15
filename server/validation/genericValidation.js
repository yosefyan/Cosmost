import Joi from "joi";
const nestedValidation = ({ keys, min = 2, max = 256, messages = null }) => {
  const schemaObject = {};
  const notRequiredKeys = ["Profile_Picture", "Alt", "Upload"];
  const urlTypeKeys = ["Profile_Picture", "Upload"];

  for (const key in keys) {
    const logicTypeHandler = !urlTypeKeys.includes(key)
      ? Joi.string()
      : urlTypeKeys.includes(key)
      ? Joi.string().uri()
      : Joi.number();
    let schemaBuilder = logicTypeHandler;
    if (min) schemaBuilder = schemaBuilder.min(key === "zip" ? 10000 : min);
    if (max) schemaBuilder = schemaBuilder.max(key === "zip" ? 9999999 : max);
    if (!notRequiredKeys.includes(key))
      schemaObject[key] = schemaBuilder.required();
    else schemaObject[key] = schemaBuilder;
    if (messages)
      schemaObject[key] = schemaBuilder.messages({
        "string.pattern.base": messages,
        "string.uri": "Please provide a valid URL",
      });
  }
  return Joi.object(schemaObject);
};

const inlineValidation = ({
  type = Joi.string(),
  additionalType,
  min = 2,
  max = 256,
  length = null,
  isRequired = true,
  regex = null,
  messages = null,
}) => {
  let value = type;
  if (type.type === "boolean") value = type;
  else {
    if (additionalType) value = additionalType;
    if (min) value = value.min(min);
    if (max) value = value.max(max);
    if (length) value = value.length(length);
    if (regex) value = value.pattern(regex);
  }
  if (isRequired) value = value.required();
  if (messages)
    value = value.messages({
      "string.email": messages,
      "string.pattern.base": messages,
    });
  return value;
};

export { nestedValidation, inlineValidation };

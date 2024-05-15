const createInstance = async ({ collectionType, data }) => {
  let instance = new collectionType(data);
  return await instance.save();
};

const getInstance = async ({ collectionType, identifier = "id", value }) => {
  const query = {};
  query[identifier] = value;
  return collectionType.find(!value ? null : query);
};

const updateByIdInstance = ({
  collectionType,
  identifier,
  updateSpecific,
  data,
}) => {
  let updateQuery = updateSpecific ? { $set: updateSpecific } : data;
  return collectionType.findByIdAndUpdate(identifier, updateQuery, {
    new: true,
  });
};

const deleteByIdInstance = ({ collectionType, identifier }) => {
  return collectionType.findByIdAndDelete(identifier);
};

export { createInstance, getInstance, updateByIdInstance, deleteByIdInstance };

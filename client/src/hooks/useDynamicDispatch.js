import { useDispatch } from "react-redux";

const useDynamicDispatch = () => {
  const dispatch = useDispatch();

  const dynamicDispatch = (type, payload) => {
    return dispatch({
      type,
      payload,
    });
  };

  return dynamicDispatch;
};

export default useDynamicDispatch;

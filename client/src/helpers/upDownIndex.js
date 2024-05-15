const upDownIndex = (i) => {
  return i % 2 === 0 ? `shadow-fuchsia-500 upDown` : `shadow-cyan-500 downUp`;
};

export default upDownIndex;

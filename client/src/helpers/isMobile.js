const isMobileDevice = () => {
  return window.innerWidth <= 1000 && window.scrollTo({ top: 0, behavior: "smooth" });
};

export default isMobileDevice;

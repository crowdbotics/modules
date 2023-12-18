export const formatUrlPath = (path) => {
  // Trim leading and trailing slashes from the path
  return path.replace(/^\//, "").replace(/\/$/, "");
};

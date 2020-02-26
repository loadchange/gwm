export const humpToLine = (name: string) => {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
};

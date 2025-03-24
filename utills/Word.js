export const truncateDescription = (description) => {
  if (!description) return "";

  const words = description.split(" ");
  if (words.length <= 10) return description;

  return words.slice(0, 10).join(" ") + "...";
};

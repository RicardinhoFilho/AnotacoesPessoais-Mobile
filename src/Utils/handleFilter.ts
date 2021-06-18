export const handleFilter = (
  filter: string,
  title: string,
  description: string | undefined
) => {
  var expression = new RegExp(filter, "i");
  if (description) {
    if (!expression.test(title) && !expression.test(description)) {
      return true;
    }
  } else {
    if (!expression.test(title)) {
      return true;
    }
  }

  return false;
};

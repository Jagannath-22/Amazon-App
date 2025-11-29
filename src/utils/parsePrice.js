export const parsePrice = (value) => {
  if (!value) return 0;
  const numeric = parseFloat(
    value.toString().replace(/[^\d.]/g, "")
  );
  return isNaN(numeric) ? 0 : numeric;
};

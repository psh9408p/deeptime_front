export default (refDate) => {
  const startDate = new Date(refDate);
  const endDate = new Date(refDate);

  startDate.setTime(
    refDate.getTime() -
      (refDate.getHours() * 3600000 +
        refDate.getMinutes() * 60000 +
        refDate.getSeconds() * 1000 +
        refDate.getMilliseconds()),
  );

  endDate.setTime(
    refDate.getTime() -
      (refDate.getHours() * 3600000 +
        refDate.getMinutes() * 60000 +
        refDate.getSeconds() * 1000 +
        refDate.getMilliseconds()) +
      86400000,
  );

  return { startDate, endDate };
};

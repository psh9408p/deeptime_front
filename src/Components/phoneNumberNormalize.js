export default (Number) => {
  const phone_tmp = Number.split('82');
  const phoneNumber = phone_tmp[1].replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    '$1-$2-$3',
  );

  return phoneNumber;
};

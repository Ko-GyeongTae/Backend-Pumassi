export const todayString = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString();

  let month = (date.getMonth() + 1).toString();
  month = +month < 10 ? '0' + month : month;

  let day = date.getDate().toString();
  day = +day < 10 ? '0' + day : day;

  const result = year + '-' + month + '-' + day;
  return result;
};

export const TransformDate = (date: string) => {
  const fulldate = new Date(date);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthByNumber = fulldate.getUTCMonth();

  const date2 = fulldate.getUTCDate() + 1;
  return monthNames[monthByNumber] + ", " + date2;
};

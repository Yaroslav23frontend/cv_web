export default function date(date) {
  const tempDate = new Date(date);
  const monthString = [
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
  const month = tempDate.getMonth();
  const year = tempDate.getFullYear();
  return `${monthString[month]} ${year}`;
}

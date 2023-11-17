import moment from "moment";
export function formatDateTime(dateTimeString) {
  // Parse the input date-time string
  const date = moment(dateTimeString);

  // Format it in a human-readable way, e.g., "October 21"
  const month = date.format("MMMM");
  const year = date.format("YY");

  return `${month} ${year}`;
}

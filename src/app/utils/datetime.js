import moment from "moment";
export function formatDateTime(dateTimeString) {
  // Parse the input date-time string
  const date = moment(dateTimeString);

  // Format it in a human-readable way, e.g., "October 21"
  const month = date.format("MMMM");
  const year = date.format("YY");

  return `${month} ${year}`;
}

export function getRelativeTime(timestamp) {
  const currentDate = new Date();
  const createdAtDate = new Date(timestamp);

  const timeDifference = currentDate - createdAtDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

// Usage example:
const createdTimestamp = "2023-01-15T10:30:00.000Z"; // Replace with your actual timestamp
const relativeTime = getRelativeTime(createdTimestamp);
console.log(relativeTime);

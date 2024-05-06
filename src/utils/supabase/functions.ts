// utils/timeUtils.ts

export function getTimeDifference(created_at: string): string {
  const createdDate = new Date(created_at);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdDate.getTime();
  const minutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes
  const hours = Math.floor(timeDifference / 3600000); // Convert milliseconds to hours
  const days = Math.floor(timeDifference / 86400000); // Convert milliseconds to days

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}

export default function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const timeDifference = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days < 30) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
}

function timeOnClock(n) {
  const secondsInDay = 24 * 60 * 60;

  const totalSeconds = n % secondsInDay;

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
}

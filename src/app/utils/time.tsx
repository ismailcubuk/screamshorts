// iso formatı
export const iso8601ToSeconds = (iso8601Duration: string): number => {
  const regex = /^P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?$/;
  const matches = iso8601Duration.match(regex);

  if (!matches) return 0;

  const years = parseInt(matches[1] || "0");
  const months = parseInt(matches[2] || "0");
  const days = parseInt(matches[3] || "0");
  const hours = parseInt(matches[4] || "0");
  const minutes = parseInt(matches[5] || "0");
  const seconds = parseInt(matches[6] || "0");

  return (
    years * 365 * 24 * 3600 +
    months * 30 * 24 * 3600 +
    days * 24 * 3600 +
    hours * 3600 +
    minutes * 60 +
    seconds
  );
};

// Toplam saniye hh:mm:ss
export const formatDuration = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hStr = hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
  const mStr = `${minutes.toString().padStart(2, "0")}:`;
  const sStr = `${seconds.toString().padStart(2, "0")}`;

  return `${hStr}${mStr}${sStr}`;
};

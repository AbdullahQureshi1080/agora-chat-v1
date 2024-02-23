function getCurrentTimeUid() {
  // Get the current time in milliseconds
  const currentTime = new Date().getTime();
  // Ensure the time is within a 24-bit range (0 to 16777215)
  const truncatedTime = currentTime % 16777216;
  return truncatedTime;
}

export {getCurrentTimeUid};

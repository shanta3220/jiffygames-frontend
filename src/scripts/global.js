export function getTimeInterval(timestamp) {
    let seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
    let unit = "second";
    let direction = "ago";
    let value = seconds;

    let daysPerYear = 365;
    let secondsPerMinute = 60;
    let secondsPerHour = secondsPerMinute * secondsPerMinute;
    let secondsPerDay = secondsPerHour * 24;
    let secondsPerYear = secondsPerDay * daysPerYear;

    if (seconds >= secondsPerYear) {
        value = Math.floor(seconds / secondsPerYear);
        unit = "year";
    } else if (seconds >= secondsPerDay) {
        value = Math.floor(seconds / secondsPerDay);
        unit = "day";
    } else if (seconds >= secondsPerHour) {
        value = Math.floor(seconds / secondsPerHour);
        unit = "hour";
    } else if (seconds >= secondsPerMinute) {
        value = Math.floor(seconds / secondsPerMinute);
        unit = "minute";
    }

    if (value !== 1) unit = unit + "s";
    if (value < 0) value = 0;

    return value + " " + unit + " " + direction;
}
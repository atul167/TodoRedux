import dayjs from 'dayjs';
export function daysofweek() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date();
    return days[d.getDay()];
}
export function getDateToday() {
    const date = new Date();
    
    // Add 1 to month since getMonth() returns 0-11
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Pad single digits with leading zero
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    
    return `${formattedDay}-${formattedMonth}-${year}`;
}

export const dayPosition = () => {
    const today = dayjs();
    const endOfYear = dayjs().endOf('year');
    const startOfYear = dayjs().startOf('year');
    // console.log(endOfYear, startOfYear);
    const totalDays = endOfYear.diff(startOfYear, 'day') + 1;
    const daysElapsed = today.diff(startOfYear, 'day');
    const daysLeft = endOfYear.diff(today, 'day');
    const percentageComplete = Math.round( 1.0* (daysElapsed / totalDays) * 100, 2);
    return { daysElapsed, daysLeft ,percentageComplete };
}
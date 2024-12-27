export function convertToTimeFormat(decimal: number): string {
    // Get the hours by taking the integer part of the decimal
    let hours: number = Math.floor(decimal);

    // Get the minutes by multiplying the decimal part by 60
    let minutes: number = Math.round((decimal - hours) * 60);

    // Format the time in "hours:minutes" (with leading zero for minutes if necessary)
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

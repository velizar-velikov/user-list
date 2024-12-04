export function formatDate(dateISO, showWeekDay) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (showWeekDay) {
        options.weekday = 'long';
    }
    const date = new Date(dateISO);
    return date.toLocaleDateString('en-US', options);
}

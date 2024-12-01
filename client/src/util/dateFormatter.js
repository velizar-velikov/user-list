export function formatDate(dateISO) {
    const date = new Date(dateISO);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const formatDate = (date: number) => new Date(date).toLocaleDateString('nl-BE', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
});
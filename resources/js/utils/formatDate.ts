export const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
  timeZone: "America/Sao_Paulo",
});

export function formatDate(date: number|Date) {
  return dateTimeFormat.format(date)
}

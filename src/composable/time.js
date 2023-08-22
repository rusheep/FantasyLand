// 2023-08-22T00:00:00.000Z => 2023-08-22
export function formatDateToISOString(ticketDate) {
  const formattedDate = new Date(ticketDate).toISOString().split('T')[0];
  return formattedDate;
}

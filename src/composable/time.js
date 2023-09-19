// 2023-08-22T00:00:00.000Z => 2023-08-22
export function formatDateToISOString(ticketDate) {
  const formattedDate = new Date(ticketDate).toISOString().split('T')[0];
  return formattedDate;
}

// 取得現在台端時間
export function taiwanTime() {
  const localTime = new Date();
  const taiwanTime = new Date(localTime.getTime() + 8 * 60 * 60 * 1000);
  return taiwanTime;
}

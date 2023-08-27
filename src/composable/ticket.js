/* 1. 如果票券已使用 (used) 轉灰色  如果未使用(unuse) 轉 他該有的顏色 */
export const colorByTicketStatusAndType = (status, ticketType) => {
  if (status === 'used') {
    return '#B3C3C5';
  } else if (status === 'unuse') {
    if (ticketType === '成人票') {
      return '#00B9D2';
    } else if (ticketType === '兒童票') {
      return '#4786D0';
    } else if (ticketType === '優待票') {
      return '#04D200';
    }
  }
  return '';
};

//票券狀態文字轉換
export const ticketStatusText = (status)=>{
  if (status ==='used') {
    return '已使用';
  }else if(status === 'unuse') {
    return '未使用';
  }else {
    return '錯誤狀態';
  }
}
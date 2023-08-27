import { formatDateToISOString } from './time';
import { colorByTicketStatusAndType } from './ticket';
import { ticketStatusText} from './ticket';

// Time:
/*1. 2023-08-22T00:00:00.000Z => 2023-08-22 */
export const getFormatDateToISOString = formatDateToISOString;

// Tickets:
/* 1. 如果票券已使用 (used) 轉灰色  如果未使用(unuse) 轉 他該有的顏色 */
export const getColorByTicketStatusAndType = colorByTicketStatusAndType;

//*2. 票券狀態文字轉換
export const getTicketStatusText = ticketStatusText;

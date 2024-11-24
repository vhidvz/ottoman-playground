import { toString } from './transform.util';

export type MessageEvent = {
  id?: string;
  type?: string;
  event?: string;
  data?: string | object;
  retry?: number;
};
export const getMessageEvent = (payload: MessageEvent): string => {
  const { id, type, data, event, retry } = payload;

  let result = id ? `id: ${id}\n` : '';
  if (type) result += `type: ${type}\n`;
  if (event) result += `event: ${event}\n`;
  if (data) result += `data: ${toString(data)}\n`;
  if (retry) result += `retry: ${retry}\n`;

  return result + '\n';
};

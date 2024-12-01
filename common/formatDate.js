// common/formatDate.js
import { format } from 'date-fns';

/**
 * Форматирует строку даты в формат "ДД.ММ.ГГГГ".
 * @param {string} dateString - Строка даты в формате ISO.
 * @returns {string} - Отформатированная дата.
 */
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy');
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return '';
  }
};

/**
 * Форматирует строку даты для истории заказов в формат "ДД.ММ.ГГГГ ЧЧ:ММ".
 * @param {string} dateString - Строка даты в формате ISO.
 * @returns {string} - Отформатированная дата и время.
 */
export const formatDateHistory = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy HH:mm');
  } catch (error) {
    console.error('Ошибка форматирования даты для истории:', error);
    return '';
  }
};

/**
 * Форматирует строку даты во время в формате "ЧЧ:ММ".
 * @param {string} dateString - Строка даты в формате ISO.
 * @returns {string} - Отформатированное время.
 */
export const formatTime = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'HH:mm');
  } catch (error) {
    console.error('Ошибка форматирования времени:', error);
    return '';
  }
};
import { isAfter, isBefore } from 'date-fns';

export const isDeliveryTimeValid = (time, deliveryStart, deliveryEnd) => {
  if (!time) return true;

  const date = new Date(time);

  const deliveryStartTime = new Date(date);
  deliveryStartTime.setHours(deliveryStart, 0, 0, 0);

  const deliveryEndTime = new Date(date);
  deliveryEndTime.setHours(deliveryEnd, 0, 0, 0);

  return isAfter(date, deliveryStartTime) && isBefore(date, deliveryEndTime);
};

export const isOrderTimeValid = (time, scheduleStart, scheduleEnd) => {
  if (!time) return true;

  const date = new Date(time);

  const scheduleStartTime = new Date(date);
  scheduleStartTime.setHours(scheduleStart, 0, 0, 0);

  const scheduleEndTime = new Date(date);
  scheduleEndTime.setHours(scheduleEnd, 0, 0, 0);

  return isAfter(date, scheduleStartTime) && isBefore(date, scheduleEndTime);
};
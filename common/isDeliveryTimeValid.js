import { isAfter, isBefore, setHours, setMinutes } from 'date-fns';

export const isDeliveryTimeValid = (time, deliveryStart, deliveryEnd) => {
  if (!time) return true;

  const deliveryStartTime = setMinutes(setHours(new Date(), deliveryStart), 0);
  const deliveryEndTime = setMinutes(setHours(new Date(), deliveryEnd), 0);

  return isAfter(time, deliveryStartTime) && isBefore(time, deliveryEndTime);
};

export const isOrderTimeValid = (time, scheduleStart, scheduleEnd) => {
  if (!time) return true;

  const scheduleStartTime = setMinutes(setHours(new Date(), scheduleStart), 0);
  const scheduleEndTime = setMinutes(setHours(new Date(), scheduleEnd), 0);

  return isAfter(time, scheduleStartTime) && isBefore(time, scheduleEndTime);
};
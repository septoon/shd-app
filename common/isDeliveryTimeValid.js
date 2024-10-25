import { isAfter, isBefore, setHours, setMinutes } from 'date-fns';

export const isDeliveryTimeValid = (time, deliveryStart, deliveryEnd) => {
  if (!time) return true;

  const deliveryStartTime = setMinutes(setHours(new Date(), deliveryStart), 0);
  const deliveryEndTime = setMinutes(setHours(new Date(), deliveryEnd), 0);

  return isAfter(time, deliveryStartTime) && isBefore(time, deliveryEndTime);
};
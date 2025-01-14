import { useMemo, useCallback } from 'react';
import { sendOrder } from '../sendOrder';
import { addOrderToHistoryAsync } from '../../redux/Features/cart/orderHistorySlice';
import { clearCart } from '../../redux/Features/cart/cartSlice';
import { Alert } from 'react-native';
import { isDeliveryTimeValid, isOrderTimeValid } from '../isDeliveryTimeValid';

const useOrderDialog = ({
  orderType,
  phoneNumber,
  address,
  totalPrice,
  minDeliveryAmount,
  paidDelivery,
  deliveryStart,
  deliveryEnd,
  scheduleStart,
  scheduleEnd,
  deliveryCost,
  pay,
  items,
  comment,
  showDate,
  selectedDate,
  shortDate,
  shortTime,
  dispatch,
  setModalVisible,
  router,
  setIsDisabledMessage,
  setCheckEmptyField,
}) => {
  const timeToValidate = useMemo(
    () => (showDate && selectedDate ? new Date(selectedDate) : new Date()),
    [showDate, selectedDate]
  );

  const ordersCount = useMemo(() => Math.floor(Math.random() * 99999999), []);

  const isButtonDisabled = useMemo(() => {
    if (orderType === 'Доставка') {
      return (
        !phoneNumber ||
        phoneNumber.length < 18 ||
        !address ||
        (totalPrice < minDeliveryAmount && !paidDelivery) ||
        !isDeliveryTimeValid(timeToValidate, deliveryStart, deliveryEnd)
      );
    }
    return (
      !phoneNumber ||
      phoneNumber.length < 18 ||
      !isOrderTimeValid(timeToValidate, scheduleStart, scheduleEnd)
    );
  }, [
    orderType,
    phoneNumber,
    address,
    totalPrice,
    minDeliveryAmount,
    paidDelivery,
    timeToValidate,
    deliveryStart,
    deliveryEnd,
    scheduleStart,
    scheduleEnd,
  ]);

  const totalWithDeliveryPrice = useMemo(() => deliveryCost + totalPrice, [deliveryCost, totalPrice]);
  const paid = useMemo(
    () => paidDelivery && totalPrice < minDeliveryAmount && orderType === 'Доставка',
    [paidDelivery, totalPrice, minDeliveryAmount, orderType]
  );

  const handleOrder = useCallback(() => {
    const dishes = items
      .map(
        (item) =>
          `${item.name} x ${
            item.options ? item.quantity * item.serving + 'г.' : item.quantity + 'шт.'
          }`
      )
      .join('\n');

    const orderDetails = {
      orderType,
      address,
      phoneNumber,
      comment,
      dishes,
      items,
      paid,
      totalPrice,
      totalWithDeliveryPrice,
      pay,
      checked: showDate,
      shortDate,
      shortTime,
      ordersCount,
      date: new Date().toISOString(),
    };

    if (isButtonDisabled) {
      Vibration.vibrate(500, false);
      setCheckEmptyField(true);
      setIsDisabledMessage(true);

      setTimeout(() => {
        setCheckEmptyField(false);
        setIsDisabledMessage(false);
      }, 2000);
    } else {
      sendOrder(orderDetails);
      dispatch(clearCart());
      dispatch(addOrderToHistoryAsync(orderDetails));
      Alert.alert(
        'Спасибо за заказ',
        'В течение 10-ти минут с вами свяжется оператор для подтверждения заказа.',
        [
          { text: 'Мои заказы', onPress: () => router.push('/profile') },
          { text: 'OK' },
        ]
      );
      setModalVisible(false);
    }
  }, [
    items,
    orderType,
    address,
    phoneNumber,
    comment,
    paid,
    totalPrice,
    totalWithDeliveryPrice,
    pay,
    showDate,
    shortDate,
    shortTime,
    ordersCount,
    isButtonDisabled,
    dispatch,
    router,
    setModalVisible,
  ]);

  return {
    timeToValidate,
    ordersCount,
    isButtonDisabled,
    totalWithDeliveryPrice,
    paid,
    handleOrder,
  };
};

export default useOrderDialog;
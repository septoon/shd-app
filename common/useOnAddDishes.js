import { useDispatch } from 'react-redux';

// Кастомный хук для добавления товаров в корзину
export const useOnAddDishes = () => {
  const dispatch = useDispatch();

  return (id, name, image, serving, options, price) => {
    dispatch((dispatch, getState) => {
      const cart = getState().cart;
      const existingItem = cart.items.find((item) => item.id === id);

      if (existingItem) {
        // Если товар с таким id уже есть, увеличиваем количество
        dispatch({
          type: 'UPDATE_CART_ITEM',
          payload: {
            id,
            quantity: existingItem.quantity + 1, // Увеличиваем количество
          },
        });
      } else {
        // Если товара нет, добавляем его как новый элемент
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            id,
            name,
            image,
            serving,
            options,
            price,
            quantity: 1, // По умолчанию количество 1
          },
        });
      }
    });
  };
};


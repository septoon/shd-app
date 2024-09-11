import { addDishToCart } from '../redux/Features/cart/cartSlice';
import { useDispatch } from 'react-redux';

export const useOnAddDishes = () => {
  const dispatch = useDispatch();

  const onAddDishes = (id, name, image, serving, options, price) => {
    const obj = {
      id,
      name,
      image,
      serving,
      options,
      price,
    };
    dispatch(addDishToCart(obj));
  };

  return onAddDishes;
};
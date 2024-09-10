import { Button, Image, Text, View } from 'react-native';
import { Trash } from '../common/img/trash.svg'
import tw from 'twrnc';

const CartItem = ({
  id,
  image,
  name,
  serving,
  price,
  options,
  countById,
  onClickMinusDish,
  onClickPlusDish,
  onClickRemoveDish,
}) => {
  const onMinusDish = () => {
    const dishObj = {
      dishId: id,
    };
    onClickMinusDish(dishObj);
  };

  const onPlusDish = () => {
    const dishObj = {
      dishId: id,
    };
    onClickPlusDish(dishObj);
  };

  const onRemoveDish = () => {
    const dishObj = {
      dishId: id,
      serving: serving,
    };
    onClickRemoveDish(dishObj);
  };
  return (
    <View
      style={tw`h-20 px-1.5 flex flex-row justify-between items-center mb-2 bg-white font-comfortaa rounded-xl`}>
      <View>
        <Image
          style={tw`w-10 h-8 object-fill rounded-md`}
          sizes="20%"
          width={10}
          height={8}
          src={image}
        />
      </View>
      <View style={tw`flex w-[30%]`}>
        <Text style={tw`text-[10px]`}>{name}</Text>
        <Text style={tw`text-xs opacity-40`}>{serving}</Text>
      </View>
      <Button title='-' style={tw`w-4`} onPress={onMinusDish}/>
      <View style="">
        {options ? <Text>{serving * countById} г.</Text> : <Text>{countById}шт.</Text>}
      </View>
      <Button title='+' style={tw`w-4`} onPress={onPlusDish}/>
      <View style="">
        <Text>{price * countById}₽</Text>
      </View>
      <View style="">
        <View style="" onClick={onRemoveDish}>
          <Image src={Trash} style={tw`w-4 h-4`} width={4} height={4} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

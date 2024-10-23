import { View } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';
import tw from 'twrnc';

const PreLoader = () => {
  const animation = useRef(null);
  return (
    <View style={tw`flex w-full h-full justify-center items-center`}>
          <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'transparent',
          }}
          source={require('../assets/loaders/Preloader.json')}
        />
      </View>
  )
}

export default PreLoader
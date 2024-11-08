import { Animated, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RenderRightActions = (
  progress,
  dragAnimatedValue
) => {
  const opacity = dragAnimatedValue.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.swipedRow}>
      <View style={styles.swipedConfirmationContainer}>
        <Text style={styles.deleteConfirmationText}>Вы уверены?</Text>
      </View>
      <Animated.View style={[styles.deleteButton, {opacity}]}>
        <TouchableOpacity>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default RenderRightActions

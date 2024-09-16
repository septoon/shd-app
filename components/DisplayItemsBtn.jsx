import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle } from '../redux/Features/menu/toggleItemsDisplaySlice'

const DisplayItemsBtn = () => {
  const { isEnabled } = useSelector(state => state.toggleItems)
  const dispatch = useDispatch()

  const toggleSwitch = () => {
    dispatch(setToggle(!isEnabled));
  };
  return (
     <TouchableOpacity onPress={toggleSwitch}>
      {
        isEnabled ? (<Image source={require('../assets/img/icons/Frame1.png')} style={{ width: 28, height: 28 }} />)
       : (
          <Image source={require('../assets/img/icons/Frame2.png')} style={{ width: 28, height: 28 }} />
        )
      }
     </TouchableOpacity>
  )
}

export default DisplayItemsBtn

const styles = StyleSheet.create({})
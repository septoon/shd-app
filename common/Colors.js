import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const Colors = {
    main: '#007da0',
    primary: '#1E90FF',
    secondary: '#6fd9e5',
    back: '#21A599',
    bgOrder: '#EFEFF4',
    bgInput: '#EBEBEE',
    darkMode: colorScheme === 'dark' ? '#fff' : '#000',
    slideBg: '#f0f0f0',
    quinary: '#8A2BE2',
    senary: '#00FF7F',
    septenary: '#FF69B4',
    octonary: '#FF4500',
    nonary: '#9370DB',
    denary: '#20B2AA'
}
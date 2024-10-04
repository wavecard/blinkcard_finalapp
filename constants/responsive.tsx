import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (percentage: number) => Math.min(width, height) * (percentage / 100);

export default responsiveFontSize;

import {Platform, Dimensions, StatusBar} from 'react-native';

export const DEVICE_HEIGHT = Dimensions.get('window').height; //983
export const DEVICE_WIDTH = Dimensions.get('window').width; //375
export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const Colors = {
  // mainBgColor: '#E4F0FA',
  mainBgColor: '#FFFFFF',
  darkBgColor: '#CCE6F5',
  textColor: '#334669',
  lightTextColor: '#5D6C87',
  darktextColor: '#2F749B',
  placeholderTextColor: '#6E81A0',
  primaryButtonColor: '#4AB0E0',
  secondaryButtonColor: '#CFE2F2',
  thirdButtonColor: '#D4E6F4',
  errorColor: '#D53D4D',
  activeTintColor: '#43AADB',
  inactiveTintColor: '#8B9DBA',
};


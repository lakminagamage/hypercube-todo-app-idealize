import { StyleSheet } from 'react-native';
import { defcolors } from '../colors/colors';

const textStyles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    height: 40,
    width: 250,
    textAlign: 'center',
    borderColor: defcolors.darkBlue,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 17,
  },

  textSmaller: {
    color: defcolors.grey,
    marginTop: 10,
  },

  labelText: {
    color: defcolors.black,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export { textStyles };
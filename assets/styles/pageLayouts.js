import { StyleSheet } from 'react-native';
import { defcolors } from '../colors/colors';

const pageLayouts = StyleSheet.create({
  pageHeader: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: defcolors.white,
    width: '100%',
    height: 100,
    marginTop: 50,
  },

  backButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: defcolors.white,
    borderRadius: 20,
    borderColor: defcolors.darkBlue,
    borderWidth: 1,
    marginTop: -40,
  },

  backButton: {
    width: 20,
    height: 20,
  },

  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 70,
    height: 70,
  },

  heading: {
    fontSize: 35,
    marginLeft: -20,
    marginTop: -20,
  },  

  curvedBody: {
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    backgroundColor: defcolors.lightGrey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    flexDirection: 'column',
  },
});

export { pageLayouts };
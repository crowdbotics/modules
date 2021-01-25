import { StyleSheet, Dimensions } from 'react-native'

import { DimensionsStyle } from './utils';

export const styles = StyleSheet.create({
  parallaxHeader: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    backgroundColor: '#F3F3F3',
    borderRadius: 30
  },
  top: {
    position: 'absolute',
    top: -15,
    left: 0,
    right: 0,
    width: Dimensions.width,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#F3F3F3"
  },
  header: {
    height: 290,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    position: 'relative',
    paddingTop: DimensionsStyle.safeAreaTopHeight + 20
  },
  heading: {
    fontSize: 26,
    color: '#7AA741',
    fontFamily: 'Avenir Heavy'
  },
  inputContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: 35
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    width: '100%',
    borderColor: '#000000',
    fontSize: 17,
    padding: 0,
    paddingVertical: 7,
    fontFamily: 'Avenir Book'
  },
  lable: {
    fontSize: 17,
    color: '#000000',
    fontFamily: "Avenir-Medium"
  },
  help: {
    fontSize: 16,
    color: "#8D8D8D",
    marginTop: 15,
    fontFamily: 'Avenir Book'
  },
  vender_part_3: {
    fontSize: 20,
    color: "#8D8D8D"
  },
  lable_like: {
    color: "#A4A2A2",
    fontSize: 13
  },
  lable_count: {
    color: "#3C3C3C",
    fontSize: 13
  }
});

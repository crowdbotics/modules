import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

  container: {
    padding: 10,
    height: '100%',
    backgroundColor: 'white'
  },

  followingSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,

  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: '#C4C4C4',
  },
  postIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,

    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.3,
    shadowRadius: 3.84,

  },
  followingIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,
  },
  textarea: {
    display: 'flex',
    alignItems: 'center',
  },
  followingText: {
    fontSize: 14,
    color: '#C4C4C4',
  },
  pt30: {
    paddingTop: 30,
  },
  pt10: {
    paddingTop: 5
  },
  galleryRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  smallPost: {
    height: 120,
    width: '33%',
    paddingHorizontal: 3,
  },
  columnRow: {
    width: '33%',
  },
  smallPostcolumn: {
    height: 120,
    width: '100%',
    padding: 3,
  },
  largePost: {
    height: 240,
    width: '67%',
    padding: 3,
  }
});


export default {
  styles: styles
}
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: "100%",
    backgroundColor: '#FFF'
  },
  mt15: {
    marginTop: 15
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: '#1C1A19',
    opacity: 0.5
  },
  subheaderContainer: {
    marginTop: 15,
    marginBottom: 30,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4'
  },
  subheaderDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subheaderRemoveText: {
    fontSize: 14,
    color: '#FF6848'
  },
  lextLabel: {
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  mainBody: {
    // height: '60%'
  },
  btnSave: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 50,
    width: '80%'
  }
});

export default {
  styles: styles
}
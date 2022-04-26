import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFF',
    paddingVertical: 10
  },
  pa: { padding: 10 },
  crossIcon: { position: 'absolute', zIndex: 9, height: 10, width: 10, margin: 20 },
  headerPost: { marginVertical: 20, height: 300 },
  actionContainer: { marginVertical: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  actionLeftText: { fontSize: 14, color: '#3B566E' },
  actionRight: { display: 'flex', flexDirection: 'row' },
  actionRightImage: { marginLeft: 10, height: 20, width: 20 },
  pt10: {
    paddingTop: 3
  },
  galleryRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  smallPost: {
    height: 120,
    width: '33.3%',
    paddingHorizontal: 3
  },
  columnRow: {
    width: '33%',
  },
  smallPostcolumn: {
    height: 120,
    width: '100%',
    padding: 3
  },
  largePost: {
    height: 240,
    width: '67%',
    padding: 3
  }
});

export default {
  styles: styles
}
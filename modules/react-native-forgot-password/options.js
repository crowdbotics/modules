import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topHead: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
  },
  mainHeading: {
    fontSize: 30,
    fontWeight:'bold',
    textAlign:'center',
  },
  container: {
    padding:20,
    backgroundColor:'#FFF',
    height:'100%'
  },
  inputSection: {
    paddingTop:40,
  },
  newPassword: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
   
  },
  passwordInput:{
    marginTop:50,
  },
  newpasswordLabel: {
    paddingLeft:15,
    paddingBottom:7,
  },
  confirmInput: {
    paddingTop:10,
  },
  resetButton: {
    paddingTop:20,
    paddingLeft:30,
    paddingRight:30,
  },
  back: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:30,
  },
  backText: {
    fontWeight:'600',
    fontSize:20,
  },
});

export default {
  styles: styles
}
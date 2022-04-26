import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topHead: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    height:'20%',
  },
  mainHeading: {
    fontSize: 30,
    fontWeight:'bold',
  },
  container: {
    padding:20,
    height:'100%',
    flex:1,
    justifyContent:'space-between',
    backgroundColor:'#FFF'
  },
  verification: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'50%',
  },
  verificationText: {
    fontSize:22,
  },
  resendcodedetails: {
    paddingTop:10
  },
  resendcodeText: {
    color: 'rgba(0,0,0,0.5)'
  },
  boldText: {
    fontWeight:'bold',
    color: '#231F20'
  },
  pincodeArea:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:25,
  },
  tokenFields: {
    width:'16%',
    margin:5,
  },
  submitBtn:{
    height:'30%',
    paddingLeft:20,
    paddingRight:20,
  },
});

export default {
  styles: styles
}
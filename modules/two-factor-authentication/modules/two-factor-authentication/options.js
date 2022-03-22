import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  FlexRowSpaceBetween: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between' 
  },
  FlexRow: {
    display: 'flex', flexDirection: 'row',
  },
  wp50: {
    width: "50%"
  },
  wp100: {
    width: "100%"
  },
  p5: {
    padding: 5
  }
});

let user = {
  id: 43,
  email: 'ropaxob383@f1xm.com',
  phone_number: '+923346014141',
  secret: '3232323232323232',
  method: '2FA'
}

export default {
  styles: styles,
  user
}

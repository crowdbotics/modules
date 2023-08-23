import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PricingScreen = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={[styles.subContainer]}>
          <Text style={styles.Text.Personal_Text}>Personal</Text>
          <View style={styles.Main_Icon_View}>
            <MaterialCommunityIcons
              style={styles.Main_Icon}
              name="balloon"
              color="blue"
              size={100}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_check} />
              <Text style={styles.Text}>1 User</Text>
            </View>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="close" style={styles.Icon_close} />
              <Text style={styles.Text}>Plugins Features</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_close} />
              <Text style={styles.Text}>Unlimited Space</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_check} />
              <Text style={styles.Text}>24/7 Support</Text>
            </View>
          </View>
          <View style={styles.Price_Box}>
            <Text style={styles.Dollar_sign}>$</Text>
            <Text style={styles.Price}>3</Text>
            <Text style={styles.Cents}>99</Text>
          </View>
          <Text style={styles.Monthly_Text}>monthly</Text>
          <TouchableOpacity title="Get Started" style={styles.TouchableOpacity}>
            <Text style={styles.TouchableOpacity_Text}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={[styles.subContainer]}>
          <Text style={styles.Text.Personal_Text}>Advanced</Text>
          <View style={styles.Main_Icon_View}>
            <MaterialCommunityIcons
              style={styles.Main_Icon}
              name="airballoon"
              color="blue"
              size={100}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_check} />
              <Text style={styles.Text}>2 User</Text>
            </View>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="close" style={styles.Icon_close} />
              <Text style={styles.Text}>Plugins Features</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_close} />
              <Text style={styles.Text}>Unlimited Space</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_check} />
              <Text style={styles.Text}>24/7 Support</Text>
            </View>
          </View>
          <View style={styles.Price_Box}>
            <Text style={styles.Dollar_sign}>$</Text>
            <Text style={styles.Price}>6</Text>
            <Text style={styles.Cents}>99</Text>
          </View>
          <Text style={styles.Monthly_Text}>monthly</Text>
          <TouchableOpacity title="Get Started" style={styles.TouchableOpacity}>
            <Text style={styles.TouchableOpacity_Text}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={[styles.subContainer]}>
          <Text style={styles.Text.Personal_Text}>Business</Text>
          <View style={styles.Main_Icon_View}>
            <MaterialCommunityIcons
              style={styles.Main_Icon}
              name="airballoon-outline"
              color="blue"
              size={100}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_check} />
              <Text style={styles.Text}>3 User</Text>
            </View>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="close" style={styles.Icon_close} />
              <Text style={styles.Text}>Plugins Features</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_close} />
              <Text style={styles.Text}>Unlimited Space</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.Icon_check} />
              <Text style={styles.Text}>24/7 Support</Text>
            </View>
          </View>
          <View style={styles.Price_Box}>
            <Text style={styles.Dollar_sign}>$</Text>
            <Text style={styles.Price}>9</Text>
            <Text style={styles.Cents}>99</Text>
          </View>
          <Text style={styles.Monthly_Text}>monthly</Text>
          <TouchableOpacity title="Get Started" style={styles.TouchableOpacity}>
            <Text style={styles.TouchableOpacity_Text}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default PricingScreen;

const styles = StyleSheet.create({
  subContainer: {
    shadowColor: '#9f9696',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    width: '95%',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },

  main: {
    backgroundColor: '#f1f1f1',
    width: '100%',
  },

  Text: {
    fontSize: 18,
    marginLeft: 10,
    Personal_Text: {
      alignSelf: 'center',
      marginTop: 30,
      fontSize: 30,
      fontWeight: 'bold',
      color: 'blue',
    },
  },

  Box: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 50,
  },

  Main_Icon_View: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#DCDCDC',
    borderRadius: 70,
    height: 130,
    width: 130,
  },

  Main_Icon: {
    alignSelf: 'center',
    marginTop: 14,
  },

  Icon_close: {
    name: 'close',
    color: 'red',
    fontSize: 27,
  },
  Icon_check: {
    name: 'check',
    color: 'blue',
    fontSize: 27,
  },

  Dollar_sign: {
    alignSelf: 'center',
    marginTop: -20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'blue',
  },

  Price: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 80,
    fontWeight: 'bold',
    color: 'blue',
  },

  Cents: {
    alignSelf: 'center',
    marginTop: -20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'blue',
  },

  Monthly_Text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 180,
    marginTop: -30,
  },

  TouchableOpacity: {
    marginTop: 20,
    backgroundColor: 'blue',
    marginBottom: 30,
    height: 45,
    width: 240,
    alignSelf: 'center',
  },
  TouchableOpacity_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
    textAlignVertical: 'center',
    marginTop: 7,
  },

  Price_Box: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
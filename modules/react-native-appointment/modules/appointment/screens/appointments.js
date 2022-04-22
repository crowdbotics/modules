import React, {useState} from 'react';
import {View,Text,SafeAreaView,ScrollView, TouchableOpacity,Image,StyleSheet} from 'react-native'
import { dummyAppointmentLists } from '../utils';
// @ts-ignore
import deleteIcon from '../deleteIcon.png'



const Appointments = () => {


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {dummyAppointmentLists.map((item, index) => {
            return (
              
                <View  style={styles.item}>
                  <View style={[styles.box,{backgroundColor:item.color}]}></View>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{`${item.date}, ${item.time}`}</Text>
                  </View>
                  <View style={styles.delete}>
                    <View style={styles.deleteButton}>
                      <Image
                      source={deleteIcon}
                      style={{height:17, width:17}}
                      />
                    </View>
                  </View>
                </View>
             
            )
          })}
        </View>  
      </ScrollView>
    </SafeAreaView>
  )
} 
const styles = StyleSheet.create({
 
  container:{backgroundColor:"#F1F1F1", height:'100%', paddingHorizontal:10},
  item: {display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems:'center', paddingLeft:10, backgroundColor:'white',borderRadius:10,height:106, marginBottom:15},
  card:{backgroundColor: '#DADADA', borderRadius: 10, width: '80%', height:50, textAlign:'center', display:'flex', justifyContent:'center',alignItems:'center', padding:10},
  box:{height:80, width:80, borderRadius:10,},
  title: {fontSize:14, fontWeight:'400', color:'#1E2022'},
  date:{fontSize:14, fontWeight:'400', color:'#77838F'},
  delete:{height:106, width:80,borderRadius:10},
  deleteButton: {height:'100%', display:'flex', justifyContent:'center',alignItems:'center', backgroundColor:'#EA4335',borderRadius:10}
})
export default Appointments
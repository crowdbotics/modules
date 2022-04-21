import React, {useState} from 'react';
import { Text, View,StyleSheet,ScrollView,SafeAreaView,FlatList } from 'react-native';
import Input from '../components/InputText';
// @ts-ignore
import DropDownPicker from 'react-native-dropdown-picker';
import { dummyTimeSlots } from '../utils';
import Button from '../components/Button';

const CreateAppointment = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['weekly', 'biweekly', 'daily', 'monthly']);
  const [items, setItems] = useState([
    {label: 'Weekly', value: 'weekly'},
    {label: 'Biweekly', value: 'biweekly'},
    {label: 'Daily', value: 'daily'},
    {label: 'Monthly', value: 'monthly'},
  ])

  return(
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.headItems}>
              <Text>21/4/22</Text>
              <Text>Date</Text>
            </View>
            <View style={styles.headItems}>
              <Text>12 am</Text>
              <Text>Time</Text>
            </View >
            <View style={styles.headItems}>
              <Text>1 Hr</Text>
              <Text>Duration</Text>
            </View> 
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Title</Text>
            <Input
              placeholder='Title' 
              setValue={setTitle} 
              value={title}
            />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Location</Text>
            <Input
              placeholder='Location' 
              setValue={setLocation} 
              value={location}
            />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Description</Text>
            <Input
            placeholder='Description' 
            setValue={setDescription} 
            value={description}      
            multiline={true}/>
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Select Reminder</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
            />
          </View>
          <Text>Time Slots</Text>
          <View style={styles.list}>
           {dummyTimeSlots.map((item,index)=>(
              <View style={styles.items} key={index}>
                 <Text>{item}</Text>
              </View>
           ))}
          </View>
          <View style={styles.button}>
            <Button>Create Appointment</Button>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )

};
const styles = StyleSheet.create({
  container:{height:'100%', padding:20, backgroundColor:'white'},  
  head: {display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',borderTopWidth:0.5, borderBottomWidth:1, borderColor:'#F0F2F7',paddingVertical:20},
  headItems: {display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'},
  mt15:{marginTop:15},
  mb10: {marginBottom:10},
  items:{borderWidth:1,borderRadius:10, borderBottomColor:'#D8D8D8',width:90, height:30,marginVertical:15,marginRight:15, justifyContent:'center', alignItems:'center'},
  list:{display:'flex', flexDirection:'row', flexWrap:'wrap'},
  button:{padding:15}

})
export default CreateAppointment
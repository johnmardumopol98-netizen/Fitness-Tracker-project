import React from 'react';
import {Alert,Button,Image,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useWorkouts} from '../context/WorkoutContext';

type Props=NativeStackScreenProps<RootStackParamList,'Profile'>;

export default function ProfileScreen({navigation}:Props){
 const {workouts}=useWorkouts(); const completed=workouts.filter(x=>x.completed).length; const minutes=workouts.reduce((t,x)=>t+x.duration,0); const calories=workouts.reduce((t,x)=>t+x.calories,0);
 return <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.content}>
  <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}} style={styles.avatar}/><Text style={styles.name}>Fitness User</Text><Text style={styles.email}>fitness@example.com</Text>
  <View style={styles.card}><Text style={styles.cardTitle}>Fitness Statistics</Text><Text style={styles.stat}>Total Workouts: {workouts.length}</Text><Text style={styles.stat}>Completed: {completed}</Text><Text style={styles.stat}>Total Minutes: {minutes}</Text><Text style={styles.stat}>Calories Burned: {calories} kcal</Text></View>
  <View style={styles.card}><Text style={styles.cardTitle}>About This App</Text><Text style={styles.about}>Fitness Tracker lets users create, view, update, complete, and delete workout records.</Text></View>
  <View style={styles.button}><Button title="View Workouts" onPress={()=>navigation.navigate('Workouts')}/></View><View style={styles.button}><Button title="Show App Alert" color="#64748B" onPress={()=>Alert.alert('Fitness Tracker','Your fitness tracker is working!')}/></View>
 </ScrollView></SafeAreaView>
}
const styles=StyleSheet.create({container:{flex:1,backgroundColor:'#F0FDF4'},content:{padding:20,alignItems:'center'},avatar:{width:110,height:110,margin:20},name:{fontSize:25,fontWeight:'bold',color:'#14532D'},email:{color:'#64748B',margin:5,marginBottom:20},card:{width:'100%',backgroundColor:'#FFF',padding:20,borderRadius:12,marginBottom:15,elevation:2},cardTitle:{fontSize:18,fontWeight:'bold',color:'#14532D',marginBottom:12},stat:{color:'#475569',paddingVertical:5},about:{color:'#475569',lineHeight:22},button:{width:'100%',marginTop:10}});

import React,{useState} from 'react';
import {ActivityIndicator,Alert,FlatList,Modal,Pressable,SafeAreaView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useWorkouts} from '../context/WorkoutContext';
import {Workout} from '../types/Workout';

type Props=NativeStackScreenProps<RootStackParamList,'Workouts'>;

export default function WorkoutListScreen({navigation}:Props){
 const {workouts,deleteWorkout,toggleCompleted}=useWorkouts();
 const [search,setSearch]=useState(''); const [selected,setSelected]=useState<Workout|null>(null); const [modal,setModal]=useState(false); const [loading,setLoading]=useState(false);
 const filtered=workouts.filter(x=>x.name.toLowerCase().includes(search.toLowerCase()));
 const complete=(id:string)=>{setLoading(true);setTimeout(()=>{toggleCompleted(id);setLoading(false)},400)};
 const remove=(w:Workout)=>Alert.alert('Delete Workout',`Delete "${w.name}"?`,[{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:()=>deleteWorkout(w.id)}]);
 return <SafeAreaView style={styles.container}>
  {loading&&<View style={styles.loading}><ActivityIndicator size="large"/><Text>Updating workout...</Text></View>}
  <View style={styles.top}><TextInput style={styles.search} placeholder="Search workouts..." value={search} onChangeText={setSearch}/><TouchableOpacity style={styles.add} onPress={()=>navigation.navigate('AddWorkout')}><Text style={styles.addText}>+ Add</Text></TouchableOpacity></View>
  <FlatList data={filtered} keyExtractor={x=>x.id} contentContainerStyle={styles.list} ListEmptyComponent={<Text style={styles.empty}>No workouts found.</Text>}
   renderItem={({item})=><View style={styles.workoutCard}>
    <View style={styles.header}><View style={{flex:1}}><Text style={styles.name}>{item.name}</Text><Text style={styles.category}>{item.category}</Text></View><View style={styles.badge}><Text style={styles.badgeText}>{item.difficulty}</Text></View></View>
    <View style={styles.infoRow}><Text>⏱ {item.duration} min</Text><Text>🔥 {item.calories} kcal</Text></View>
    <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.viewButton} onPress={()=>navigation.navigate('WorkoutDetails',{workoutId:item.id})}><Text style={styles.viewText}>View</Text></TouchableOpacity>
      <TouchableOpacity style={styles.completeButton} onPress={()=>complete(item.id)}><Text style={styles.completeText}>{item.completed?'Undo':'Complete'}</Text></TouchableOpacity>
      <Pressable style={styles.menuButton} onPress={()=>{setSelected(item);setModal(true)}}><Text style={styles.menuText}>⋮</Text></Pressable>
    </View>
    {item.completed&&<Text style={styles.completed}>✓ Workout Completed</Text>}
   </View>}/>
  <Modal visible={modal} transparent animationType="slide" onRequestClose={()=>setModal(false)}>
   <View style={styles.overlay}><View style={styles.modal}><Text style={styles.modalTitle}>Workout Options</Text><Text>{selected?.name}</Text>
    <TouchableOpacity style={styles.modalEdit} onPress={()=>{setModal(false);if(selected)navigation.navigate('EditWorkout',{workoutId:selected.id})}}><Text style={styles.modalEditText}>Edit Workout</Text></TouchableOpacity>
    <TouchableOpacity style={styles.modalDelete} onPress={()=>{setModal(false);if(selected)remove(selected)}}><Text style={styles.deleteText}>Delete Workout</Text></TouchableOpacity>
    <TouchableOpacity style={styles.cancel} onPress={()=>setModal(false)}><Text>Cancel</Text></TouchableOpacity>
   </View></View>
  </Modal>
 </SafeAreaView>
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#F8FAFC'},top:{flexDirection:'row',padding:15,gap:10},search:{flex:1,backgroundColor:'#FFF',borderWidth:1,borderColor:'#CBD5E1',borderRadius:9,paddingHorizontal:13},
 add:{backgroundColor:'#16A34A',paddingHorizontal:15,justifyContent:'center',borderRadius:9},addText:{color:'#FFF',fontWeight:'bold'},list:{padding:15,paddingTop:0},
 workoutCard:{backgroundColor:'#FFF',borderRadius:12,padding:16,marginBottom:12,elevation:2},header:{flexDirection:'row'},name:{fontSize:19,fontWeight:'bold',color:'#1E293B'},category:{color:'#16A34A',fontWeight:'600',marginTop:4},
 badge:{backgroundColor:'#DCFCE7',paddingHorizontal:10,paddingVertical:6,borderRadius:15},badgeText:{color:'#166534',fontSize:11,fontWeight:'bold'},infoRow:{flexDirection:'row',justifyContent:'space-between',marginTop:15},
 description:{marginTop:10,color:'#64748B',lineHeight:20},actions:{flexDirection:'row',marginTop:15,alignItems:'center'},viewButton:{backgroundColor:'#DCFCE7',padding:9,borderRadius:7,marginRight:8},viewText:{color:'#166534',fontWeight:'bold'},
 completeButton:{backgroundColor:'#DBEAFE',padding:9,borderRadius:7},completeText:{color:'#1D4ED8',fontWeight:'bold'},menuButton:{marginLeft:'auto',padding:5},menuText:{fontSize:28},completed:{color:'#16A34A',fontWeight:'bold',marginTop:10},
 empty:{textAlign:'center',marginTop:50,color:'#64748B',fontSize:16},loading:{position:'absolute',zIndex:20,left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(255,255,255,0.8)',justifyContent:'center',alignItems:'center',gap:10},
 overlay:{flex:1,justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,0.5)'},modal:{backgroundColor:'#FFF',padding:25,borderTopLeftRadius:20,borderTopRightRadius:20},modalTitle:{fontSize:22,fontWeight:'bold',marginBottom:7},
 modalEdit:{backgroundColor:'#16A34A',padding:15,borderRadius:10,alignItems:'center',marginTop:20,marginBottom:10},modalEditText:{color:'#FFF',fontWeight:'bold'},modalDelete:{backgroundColor:'#FEE2E2',padding:15,borderRadius:10,alignItems:'center',marginBottom:10},deleteText:{color:'#DC2626',fontWeight:'bold'},cancel:{padding:15,alignItems:'center'}
});

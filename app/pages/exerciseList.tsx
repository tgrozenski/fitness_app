import { Button, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, View, } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { router, useLocalSearchParams, } from "expo-router";
import Dialog from "react-native-dialog";
import Timer from '../components/timer';

type ItemData = {
    parentID: string;
    exerciseID: string;
    name: string;
    sets: number;
    targetReps: number;
    weight: string;
    restTime: string;
    marked: boolean;
}
type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    color: string;
  };

  const exerciseData: ItemData[] = [];

  const exerciseSubArr: ItemData[] = [];

  const Item = ({item, onPress,  color, backgroundColor,}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}> 
      <Text style={[styles.title, {color}]}> { item.name} </Text>
      <View style={styles.listItems}> 
      <Text style={[styles.listItem, {color}]} >Sets: { item.sets} </Text>
      <Text style={[styles.listItem, {color}]}>Rest Time: { item.restTime }</Text> 
      </View>
      <View style={ styles.listItems }>
      <Text style={[styles.listItem, {color}]}>Target Reps: { item.targetReps} </Text>
      <Text style={[styles.listItem, {color}]}>Target Weight: { item.weight }</Text>
      </View>
    </TouchableOpacity>
    
  );

const exerciseList = () => {

    const [editmode, setEditmode] = useState(false);
    const [selectedID, setSelectedID] = useState('');
    const [visible, setVisible] = useState(false);
    const [marked, setMarked] = useState(0);     
    const [compVisible, setCompVisible] = useState(false);
    const [alarmString, setAlarmString] = useState('');
    const { dayID, parentTitle, newObj } = useLocalSearchParams();
    const { parentName, parentID, exerciseID, name, sets, targetReps, weight, restTime } = useLocalSearchParams();
      
      if(parentTitle +'' != 'undefined') {
        console.log("Parent Title!!!" + {parentTitle})
      }
      else {
        router.push('pages/Home');
      }

      //set valid parent ID
      var input: string;
        if( dayID + '' == 'undefined' ) {
          input = parentID + '';
          console.log(parentID + '');
        }
        else {
          input = dayID + '';
        }
      
      exerciseSubArr.length = 0;

      exerciseData.forEach((exercise)=> {
        if(exercise.parentID == input) {
          console.log("found a match " + exercise.name);
          exerciseSubArr.push(exercise);
        }
        
      });

      const hide_delDialog = () => {
        setVisible(false);
      }

      const handleDelete = () => {
        setVisible(false);
        
      const index = exerciseData.findIndex((item) => item.exerciseID === selectedID);
      const index2 = exerciseSubArr.findIndex((item) => item.exerciseID === selectedID);
      
      if (index !== -1) {
        exerciseData.splice(index, 1);
        exerciseSubArr.splice(index2, 1);
        return true; 
      } else {
        console.log("Item not found!")
        return false; 
      }
      }

      if(dayID + '' != 'undefined') {
        
        console.log('here is your id -->' + dayID + 'here is parent title -->' + parentTitle);
        
      }
      else if (parentID + '' != 'undefined') {
        console.log("not undefined");
      }

      const newItem: ItemData = {
        parentID: input,
        exerciseID: exerciseID +'',
        name: name +'',
        sets: parseInt(sets +''),
        targetReps: parseInt(targetReps + ''),
        weight: weight +'',
        restTime: restTime + '',
        marked:false
      }

      if(name +'' != 'undefined') {
        console.log("in exercise List" + newItem.parentID);
      exerciseData.push(newItem)
      }
    
    const toggleEdit = () => {
        if (editmode) {
          setEditmode(false);
          showToast("Edit Mode Disabled");
          console.log("edit mode disabled")
        }
        else {
          setEditmode(true);
          console.log("Select an Item to DeletSelect an Item to Deletee")
          showToast("Edit Mode Enabled");
        }
      }

    const handleComplete = () => {
      setCompVisible(false);
    }

    const handleCompleteTimer = () => {
        setCompVisible(false);
        const item = exerciseSubArr.find((item) => item.exerciseID === selectedID);
        setAlarmString(item?.restTime + '');
    }
    
    const chooseParent_day = () => {
        if (parentTitle != 'undefined') {
          return parentTitle;
        }
        else {
          console.log('returning parent name->  ' + {parentName})
          return parentName;
        }
      }

      const createExercise = () => {
        router.push({pathname: 'pages/createExercise', params: { dayID: dayID}})
      }

      const unmarkAll = () => {
        for(var i = 0; i < exerciseSubArr.length; i++) {
          exerciseSubArr[i].marked = false;
        }
        setMarked(marked + 1);
      }

      const handleEdit = () => {
        setVisible(false)
        const Item = exerciseSubArr.find((item) => item.exerciseID === selectedID);
        handleDelete();
        router.push({pathname: "pages/editExercise", 
          params: {parentID: Item?.parentID, itemID: Item?.exerciseID, itemName: Item?.name, itemSets: Item?.sets, itemWeight: Item?.weight, 
            itemReps: Item?.targetReps, itemRestTime: Item?.restTime}})
          setMarked(marked +1);
      }

      const itemTouchevent = (id: string, item: ItemData) => {
        setSelectedID(id);
        if (editmode) {
        setVisible(true);
        }
        else {
        if(item.marked) {
          setMarked(marked + 1);
          item.marked = false;
        }
        else {
          setCompVisible(true);
          item.marked = true;
          setMarked(marked + 1);
        }
        console.log(item.marked);
        }
      }

      const stringtoMili = (alarm: String): number => {
        var i = 0;
        var mili: number = 0; 
        switch(i) {
            case 0: 
            mili += (parseInt(alarm[i]) * 10) * 60000;
            i++;
            case 1: 
            mili+= (parseInt(alarm[i])) * 60000;  
            i++;
            case 2: 
            i++;
            case 3: 
            mili += (parseInt(alarm[i]) * 10) * 1000
            i++;
            case 4:
            mili += (parseInt(alarm[i])) * 1000
        }
        return mili;
        }
      const renderItem = ({item}: {item: ItemData}) => {
        var backgroundColor = 'red';
        if(editmode==false){
          if(item.marked) {
            backgroundColor = 'green';
          }
          else {
            backgroundColor = 'red';
          }
          
        }
        const color = item.exerciseID === selectedID ? 'black' : 'white';
    
        return (
          <Item
            item={item}
            backgroundColor={backgroundColor}
            color={color}
            onPress={() => 
              itemTouchevent(item.exerciseID, item)}
          />
        );
      };

    const timerComponent = () => {
      const seconds: number = stringtoMili(alarmString + '') / 1000; 
      console.log("Timer component: alarmstring-> " + alarmString + " seconds var --> " + seconds);
      if (seconds > 0) {
        return(
        <Timer SEC={seconds} ></Timer>  
        );
      }
      else {
        return(
          <View></View>
        );
      }
    }
      const showToast = (message: string) => {
        Toast.show({
          type: 'success',
          text1: message,
        })
      }

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.mainTitle}> { chooseParent_day() } </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', padding: 20}}>
      <Button title="Toggle Edit" color='orange' onPress={toggleEdit}></Button>
      <Button title="Mark All incomplete" color='orange' onPress={unmarkAll}/>
      </View>
        {timerComponent()}
      <FlatList
        data={exerciseSubArr}
        renderItem={renderItem}
        keyExtractor={item => item.exerciseID}
        extraData={selectedID}
      />
      <>
      <Toast>
      </Toast>
      </>
      <Button title='Create a new Exercise' color='orange' onPress={ createExercise }></Button>
     <Dialog.Container visible={compVisible}>
      <Dialog.Title>Start of Skip Timer?</Dialog.Title>
        <Dialog.Button label="Start Timer" onPress={handleCompleteTimer} />
        <Dialog.Button label="Skip Timer" onPress={handleComplete} />
      </Dialog.Container> 
      <Dialog.Container visible={visible}>
        <Dialog.Title>What do you want to do?</Dialog.Title>
        <Dialog.Button label="Cancel" onPress={hide_delDialog} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
        <Dialog.Button label="Edit" onPress={handleEdit}></Dialog.Button>
      </Dialog.Container>
      </SafeAreaView>
    )};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor:'dodgerblue',
        borderRadius: 10
      },
      listItem: {
        padding: 5,
        textAlign: 'center',
        borderRadius:20
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20,
        backgroundColor:'orange',
      },
      mainTitle: {
        fontSize:45,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold'
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold'
        
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:'#202020'
      },
      modalView: {
        margin: 20,
        backgroundColor: '#202020',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      timer_text: {
        justifyContent: 'center',
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold'
      },
      listItems: {
        flexDirection: 'row',    
        justifyContent: 'space-around'
      }
  }); 
export default exerciseList;
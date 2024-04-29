import { Button, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, View, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { router, useLocalSearchParams, } from "expo-router";
import Dialog from "react-native-dialog";
import Timer from '../components/timer';
import Images from '../components/images'
// import BackgroundTimer from 'react-native-background-timer';

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
    image: any;
  };
  

  const exerciseData: ItemData[] = [];

  const exerciseSubArr: ItemData[] = [];

  const Item = ({item, onPress,  backgroundColor, image: IMG}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {}]}> 
      <Text style={{fontSize: 32, color:backgroundColor , fontWeight: 'bold', textAlign: 'center', fontFamily: 'AvenirNext-Bold'}}> { item.name} </Text>
        <Image style={styles.image_small} 
        source={IMG}>
        </Image>
      <View style={styles.listItems}> 
      <Text style={[textStyles(backgroundColor).listItem, ]} >Sets: { item.sets} </Text>
      <Text style={[textStyles(backgroundColor).listItem, ]}>Rest Time: { item.restTime }</Text> 
      </View>
      <View style={ styles.listItems }>
      <Text style={[textStyles(backgroundColor).listItem, ]}>Target Reps: { item.targetReps} </Text>
      <Text style={[textStyles(backgroundColor).listItem, ]}>Target Weight: { item.weight }</Text>
      </View>
    </TouchableOpacity>
    
  );

const exerciseList = () => {

    const [editmode, setEditmode] = useState(false);
    const [selectedID, setSelectedID] = useState('');
    const [preSelectedID, setpreSelectedID] = useState('');
    const [visible, setVisible] = useState(false);
    const [arrangeState, setarrangeState] = useState(false);
    const [marked, setMarked] = useState(0);     
    const [compVisible, setCompVisible] = useState(false);
    const [alarmString, setAlarmString] = useState('');
    const { dayID, parentTitle, newObj } = useLocalSearchParams();
    const { parentName, parentID, exerciseID, name, sets, targetReps, weight, restTime } = useLocalSearchParams();
      
      if(parentTitle +'' == 'undefined') {
        router.push('pages/Home');
      }
     
      //Notification Logic goes here 
      // checkPermissions();


      useEffect(() =>{
        console.log("Selected ID: " + selectedID);
      }, [selectedID]);

      //set valid parent ID
      var input: string;
        if( dayID + '' == 'undefined' ) {
          input = parentID + '';
        }
        else {
          input = dayID + '';
        }
      
      exerciseSubArr.length = 0;

      exerciseData.forEach((exercise)=> {
        if(exercise.parentID == input) {
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
      exerciseData.push(newItem)
      }
    
    const toggleEdit = () => {
        if (editmode) {
          setEditmode(false);
          showToast("Done Editing");
        }
        else {
          setEditmode(true);
          showToast("Press the pencil when done editing");
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

      const arrangeOrder = () => {
        if(arrangeState) {
          //logic for moving item behind
          const itemIndex = exerciseData.findIndex((item) => item.exerciseID === preSelectedID);
          const destIndex = exerciseData.findIndex((item) => item.exerciseID === selectedID);
          const tempItem: ItemData = exerciseData.find((item) => item.exerciseID === preSelectedID)!;

          if(itemIndex < destIndex) {
            //if diff negative move diff - 1 positions to the right
            for (var i = itemIndex; i <= destIndex; i++) {
              if(i == destIndex) {
                exerciseData[i] = tempItem;
              }
              else {
                exerciseData[i] = exerciseData[i + 1];
              }
            }
          }
          else {
            //diff positive move to the left
            for(var i = itemIndex; i >= destIndex; i--) {
              if(i == destIndex) {
                exerciseData[i] = tempItem;
              }
              else {
                exerciseData[i] = exerciseData[i - 1];
              }
            }
          }
          setarrangeState(false);
        }
        else {
          setarrangeState(true);
          setpreSelectedID(selectedID);
          showToast("Click reorder on another item to move it there");
        }
        hide_delDialog();
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

      const renderItem = ({item}: {item: ItemData; index: number}) => {
        let backgroundColor = 'red';
        let Image = Images.x_icon; 

        if(editmode==false){
          if(item.marked) {
            backgroundColor = 'green';
            Image = Images.check_icon;
          }
          else {
            backgroundColor = 'red';
            Image = Images.x_icon; 
          }
          
        }
    
        return (
          <Item
            item={item}
            backgroundColor={backgroundColor}
            image={Image}
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
        {timerComponent()}
      <FlatList
        data={exerciseSubArr}
        renderItem={renderItem}
        keyExtractor={item => item.exerciseID}
        extraData={selectedID}
        
      />
      <>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
      
      <Pressable onPress={unmarkAll}>
      <Image style={styles.image} 
      source={require('./imgAssets/x_icon.png')}>
      </Image>
      </Pressable>      

      <Pressable onPress={toggleEdit}>
      <Image style={styles.image} 
      source={require('./imgAssets/editAsset.png')}>
      </Image>
      </Pressable>      


      <Pressable onPress={createExercise}>
      <Image style={styles.image} 
      source={require('./imgAssets/plus_Icon.png')}>
      </Image>
      </Pressable>      
      </View>
      <Toast>
      </Toast>
      </>
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
        <Dialog.Button label="Reorder" onPress={arrangeOrder}></Dialog.Button>
      </Dialog.Container>
      </SafeAreaView>
    )};

const textStyles = (backgroundColor: string ) => StyleSheet.create({

  listItem: {
    color: backgroundColor, 
    padding: 5,
    textAlign: 'center',
    borderRadius:20
  },
  title: {
    fontSize: 32,
    color: backgroundColor, 
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AvenirNext-Bold'
  },

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor:'beige',
        borderRadius: 10
      },
      listItem: {
        color: 'white', 
        padding: 5,
        textAlign: 'center',
        borderRadius:20
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20,
        backgroundColor:'#3D5168',
      },
      mainTitle: {
        fontSize:45,
        padding: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        fontFamily: 'AvenirNext-Bold'
      },
      title: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold'
        
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
      },
      image_small: {
        width: 35,
        height: 35,
      },
      image: {
        width: 50,
        height: 50,
      }
  }); 
export default exerciseList;
import { Button, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, View, } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import useRouter from "react-router";
import { router, useGlobalSearchParams, useLocalSearchParams, Link} from "expo-router";

type ItemData = {
    parentID: string;
    exerciseID: string;
    name: string;
    sets: number;
    targetReps: number;
    weight: string;
    restTime: string;
}
type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  };

  const exerciseData: ItemData[] = [];

  const exerciseSubArr: ItemData[] = [];

  const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.textStyle, {color: textColor}]}> Name:{item.name} Sets:{item.sets} Rest Time: {item.restTime} Target Reps: {item.targetReps} Target Weight:{item.weight}</Text>
    </TouchableOpacity>
  );

const exerciseList = () => {

    const [editmode, setEditmode] = useState(false);
    const [selectedID, setSelectedID] = useState('');
    const [visible, setVisible] = useState(false);
    const [currentParent, setCurrentParent] = useState('');
    const { dayID, parentTitle } = useLocalSearchParams();
    const { parentName, parentID, exerciseID, name, sets, targetReps, weight, restTime } = useLocalSearchParams();
    
    const id: string = dayID + '';

      if(parentTitle +'' != 'undefined') {
        console.log("Parent Title!!!" + {parentTitle})
      }
      else {
        router.push('pages/Home');
      }
      
    

      useEffect(() => {

        if(dayID + '' != 'undefined') {
          
          console.log('here is your id -->' + id + 'here is parent title -->' + parentTitle);
          
        }
        else if (parentID + '' != 'undefined') {
          console.log("not undefined");
        }

        //logic for which item assigned for parent id
        var input: string;
        if( id == 'undefined' ) {
          input = parentID + '';
          console.log(parentID + '');
        }
        else {
          input = id;
        }

        const newItem: ItemData = {
          parentID: input,
          exerciseID: exerciseID +'',
          name: name +'',
          sets: parseInt(sets +''),
          targetReps: parseInt(targetReps + ''),
          weight: weight +'',
          restTime: restTime + '',
        }
        if(name +'' != 'undefined') {
          console.log("in exercise List" + newItem.parentID);
        exerciseData.push(newItem)
        
        }

        //logic for name display 
        exerciseSubArr.length = 0;

        exerciseData.forEach((exercise)=> {
          if(exercise.parentID == input) {
            console.log("found a match " + exercise.name);
            exerciseSubArr.push(exercise);
          }
          
        })

      },[parentTitle]);
    
      
    const toggleEdit = () => {
        if (editmode) {
          setEditmode(false);
          showToast("Edit Mode Disabled");
          console.log("edit mode disabled")
        }
        else {
          setEditmode(true);
          console.log("edit mode enabled")
          showToast("Edit Mode Enabled");
        }
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
        router.push({pathname: 'pages/createExercise', params: { dayID: id }})
      }

      const itemTouchevent = (id: string) => {
        if (editmode) {
          showDialog(id);
        } 
        else {
                 
        }
      }

      const showDialog = (id: string) => {
        setVisible(true);
        setSelectedID(id);
        console.log('id:' + id + ' parentid:' + parentID);
      }

      const renderItem = ({item}: {item: ItemData}) => {
        const backgroundColor = item.exerciseID === selectedID ? '#170f7a' : 'orange';
        const color = item.exerciseID === selectedID ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => 
              itemTouchevent(item.exerciseID)}
            backgroundColor={backgroundColor}
            textColor={color}
          />
        );
      };
      const showToast = (message: string) => {
        Toast.show({
          type: 'success',
          text1: message,
        })
      }

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}> { chooseParent_day() } </Text>
      <Button title="Toggle Edit" color='orange' onPress={toggleEdit}></Button>
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
      
      </SafeAreaView>
    )};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor:'dodgerblue',
        borderRadius: 10
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20
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
  }); 
export default exerciseList;
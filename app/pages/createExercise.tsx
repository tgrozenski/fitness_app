import React, { useState, useEffect} from 'react';
import { Button, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { TimerPicker, TimerPickerModal } from "react-native-timer-picker";
import Dialog from "react-native-dialog";
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { router, useLocalSearchParams, } from "expo-router";


//create a type 
type exerciseData = {
    parentID: string;
    exerciseID:string;
    name: string;
    sets: number;
    targetReps: number;
    weight: string;
    restTime: string;
    
  }
const exerciseArr: exerciseData[] = [];

var counter = 0; 

const createExercisePage = () => {
    
    //prompt and set rest time
    const [showPicker, setShowPicker] = useState(false);
    const [alarmString, setAlarmString] = useState('Untitled');
    

    //prompt and set sets 
    const [showSets, setShowSets] = useState(false);
    const [sets, setSets] = useState(0);

    //prompt and set name
    const [showName, setShowsName] = useState(false);
    const [name, setName] = useState('Untitled');

    //prompt and set target Reps
    const [showTarget, setShowTarget] = useState(false);
    const [target, setTarget] = useState(0);

    //prompt and set weight 
    const [showWeight, setShowWeight] = useState(false);
    const [weight, setWeight] = useState('Undefined');

    const { dayID } = useLocalSearchParams();

    

    //Handle time
  const handleTimePicker = () => {
    console.log(alarmString);
    setShowPicker(showPicker == false)
    setShowsName(true);
  }

  const promptName = () => {
    setShowsName(true);
  }

  const promptSets = () => {
    setShowSets(true);
  }

  const promptWeight = () => {
    setShowWeight(true);
  }

  const promptTarget = () => {
    setShowTarget(true);
  }

 const submitName = () => {
    setShowsName(false);
  }
  const submitSets = () => {
    setShowSets(false);
  }
  const submitWeight = () => {
    setShowWeight(false);
  }
  const submitTarget = () => {
    setShowTarget(false);
  }
  const saveData = () => {
    //add to array
    const newObj: exerciseData = {
      parentID: dayID + '',
      exerciseID: counter+'',
      name: name,
      sets: sets,
      targetReps: target,
      weight: weight,
      restTime: alarmString
    };

    //increment counter 
    counter++;

    exerciseArr.push(newObj);
    
    console.log('In createExercise dayID is  ' + dayID );
    //display a toast indicating saved 
    showToast('Exercise Saved');
    console.log(newObj);
    //reroute to exerciseList Page 
    router.replace({ pathname:'pages/exerciseList', params: { 
      parentID: newObj.parentID, exerciseID: newObj.exerciseID, name: name, 
      sets: newObj.sets, targetReps: newObj.targetReps, weight: newObj.weight, 
      restTime: newObj.restTime } });
  }

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    })
  }
  
  
    return (
        <SafeAreaView style={styles.container}>
            
            <TimerPicker 
                  hideMinutes={showPicker}
                  hideSeconds={showPicker}
                  onDurationChange={ (pickedDuration) => {
                    setAlarmString( 'Minutes:' + pickedDuration.minutes + ' Seconds:' + pickedDuration.seconds);
                    handleTimePicker; } }
                  padWithNItems={3}
                  hideHours
                  minuteLabel="min"
                  secondLabel="sec"
                  LinearGradient={LinearGradient}
        
                  styles={{
                      theme:'dark',
                      pickerItem: {
                          fontSize: 34,
                      },
                      pickerLabel: {
                          fontSize: 26,
                          right: -20,
                      },
                      pickerLabelContainer: {
                          width: 60,
                      },
                      pickerItemContainer: {
                          width: 150,
                      },
                  }}
              />
            <Text>Rest Time: {alarmString} </Text>
            <Button title="Name your Exercise" onPress={ promptName }></Button>
            <Text>Alarm Name: { name }</Text>
            <Button title='Set Sets' onPress={ promptSets }></Button>
            <Text>Sets: {sets} </Text>
            <Button title='Set Target Weight' onPress={ promptWeight }></Button>
            <Text>Target Weight: {weight} </Text>
            <Button title='Set Target Reps' onPress={ promptTarget }></Button>
            <Text>Target Reps: {target}</Text>
            
            <Button title='Save Exercise' onPress={ saveData }></Button>

            <Dialog.Container visible={showSets}>
                <Dialog.Title>Exercise sets?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the number of sets"
                onChangeText={sets => setSets(parseInt(sets))}>
                </Dialog.Input>
                <Dialog.Button label="Submit" onPress={submitSets} />
            </Dialog.Container>
            <Dialog.Container visible={showName}>
                <Dialog.Title>Exercise name?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the exercise name!"
                onChangeText={name => setName(name)}>
                </Dialog.Input>
                <Dialog.Button label="Submit" onPress={submitName} />
            </Dialog.Container>
            <Dialog.Container visible={showTarget}>
                <Dialog.Title>Target Reps?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the target rep number!"
                onChangeText={target => setTarget(parseInt(target))}>
                </Dialog.Input>
                <Dialog.Button label="Submit" onPress={submitTarget} />
            </Dialog.Container>
            <Dialog.Container visible={showWeight}>
                <Dialog.Title>Weight number?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the target weight!"
                onChangeText={weight => setWeight(weight)}>
                </Dialog.Input>
                <Dialog.Button label="Submit" onPress={submitWeight} />
            </Dialog.Container>
              </SafeAreaView>
    )};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#202020',
        flex: 1,
        alignItems: 'center',
    }
})

export default createExercisePage;
import React, { useState, } from 'react';
import { Button, StyleSheet, SafeAreaView, Text, View, Pressable } from 'react-native';
import { TimerPicker} from "react-native-timer-picker";
import Dialog from "react-native-dialog";
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import regEx from './emoji';
import { router, useLocalSearchParams, } from "expo-router";
import exerciseData from '../components/exerciseData';

  let count = 0; 

const createExercisePage = () => {
    const [alarmString, setAlarmString] = useState('Untitled');
    const [showSets, setShowSets] = useState(false);
    const [sets, setSets] = useState(0);
    const [showName, setShowsName] = useState(false);
    const [name, setName] = useState('Untitled');
    const [showTarget, setShowTarget] = useState(false);
    const [target, setTarget] = useState(0);
    const [showWeight, setShowWeight] = useState(false);
    const [weight, setWeight] = useState('Undefined');

    
  const handleTimePicker = (minute: number, second: number) => {
    const alarmFormat = formatTime(minute, second);
    console.log(alarmFormat);
    setAlarmString(alarmFormat +'');
    console.log('AlarmString ' + alarmString);
  }

  const promptName = () => {setShowsName(true);}
  const promptSets = () => {setShowSets(true);}
  const promptWeight = () => {setShowWeight(true);}
  const promptTarget = () => {setShowTarget(true);}
  const submitName = () => {setShowsName(false);}
  const submitSets = () => {setShowSets(false);}
  const submitWeight = () => {setShowWeight(false);}
  const submitTarget = () => {setShowTarget(false);}

  const saveData = () => {


    const newObj: exerciseData = {
      parentID: lastParentId,
      exerciseID: count + '',
      name: name,
      sets: sets,
      targetReps: target,
      weight: weight,
      restTime: alarmString,
      marked: false,
    };
    
    //add to both global arrays
    globalThis.currentExercise = newObj;
    console.log("******" + globalThis.currentExercise.name);

    count++;
    
    showToast('Exercise Saved');
    router.replace({ pathname:'pages/exerciseList'} );

    }

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    })
  }

  const validateString = (input: string): string => {
    if(input.length > 30) {
      input = "Undefined"
    }
    return input;
  }

  const validateInt = (num: number): number => {
      if(num > 101) {
       return 0; 
      }
      else if(Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
       return num;  
    }

  const formatTime = (hour: number, minute: number) => {
    var timeString = ''; 
    if(hour < 10) {
      timeString+= ("0" + hour); 
    }
    else{
      timeString += hour;
    }
    timeString+= ":"
    if(minute < 10) {
      timeString+= ('0' + minute);
    }
    else {
      timeString += minute;
    }
    return timeString;
  }
  
    return (
        <SafeAreaView style={styles.container}>
            <View>
              <Text style={{padding: 10}}></Text> 
            <Pressable onPress={ promptName }> 
            <Text style={styles.pressables}>
            Click To Set Exercise Name: {name}
            </Text>
            </Pressable>
            
            <Divider />
            
            <Pressable onPress={ promptSets }> 
            <Text style={styles.pressables}>
            Sets: {sets} 
            </Text>
            </Pressable>
           
           <Divider />
           
            <Pressable onPress={ promptWeight }> 
            <Text style={styles.pressables}>
            Target Weight: {weight} 
            </Text>
            </Pressable>
            
           <Divider />

            <Pressable onPress={ promptTarget }>
            <Text style={styles.pressables}>
            Target Reps: {target}
        </Text>  
           </Pressable>

           <Divider />
            <Text style={styles.options}> Select your Rest Time: </Text>  
            <TimerPicker 
                  onDurationChange={ (pickedDuration) => {
                    handleTimePicker(pickedDuration.minutes, pickedDuration.seconds); } }
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
           </View>

            <Pressable  onPress={ saveData }> 
            <Text style={styles.pressables}>
            Save Exercise
            </Text> 
            </Pressable>

              <Toast>

              </Toast>

            <Dialog.Container visible={showSets}>
                <Dialog.Title>Exercise sets?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the number of sets"
                onChangeText={sets => setSets((parseInt(sets)))}>
                </Dialog.Input>
                <Dialog.Button label="Submit" onPress={submitSets} />
            </Dialog.Container>
            <Dialog.Container visible={showName}>
                <Dialog.Title>Exercise name?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the exercise name!"
                onChangeText={name => setName((name))}>
                </Dialog.Input>
                <Dialog.Button label="Submit" onPress={submitName} />
            </Dialog.Container>
            <Dialog.Container visible={showTarget}>
                <Dialog.Title>Target Reps?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the target rep number!"
                onChangeText={target => setTarget((parseInt(target)))}>
                </Dialog.Input>
                <Dialog.Button label="Submit" onPress={submitTarget} />
            </Dialog.Container>
            <Dialog.Container visible={showWeight}>
                <Dialog.Title>Weight number?</Dialog.Title>
                <Dialog.Input 
                placeholder="Enter the target weight!"
                onChangeText={weight => setWeight((weight))}>
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
    },
    options: {
      color: 'white',
      fontSize: 25,
      padding: 20,
    },
    pressables: {
      color: 'beige', 
      fontSize:20,
      padding: 20,
      textAlign: 'center',
    },
})

export default createExercisePage;
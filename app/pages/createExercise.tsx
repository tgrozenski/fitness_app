import React, { useState, useEffect} from 'react';
import { Button, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { TimerPicker} from "react-native-timer-picker";
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
    const [alarmMinute, setAlarmMinute] = useState(0);
    const [alarmSecond, setAlarmSecond] = useState(0);    

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
  const handleTimePicker = (minute: number, second: number) => {
    console.log(' ALARM MINUTE AND SECOND' + alarmMinute + ' : ' + alarmSecond);
    const alarmFormat = formatTime(minute, second);
    console.log(alarmFormat);
    setAlarmString(alarmFormat +'');
    console.log('AlarmString ' + alarmString);
    // setShowPicker(showPicker == false)
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

  const formatTime = (hour: number, minute: number) => {
    var timeString = ''; 
    if(hour < 10) {
      timeString+= ('0' + hour); 
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
            
            <TimerPicker 
                  hideMinutes={showPicker}
                  hideSeconds={showPicker}
                  onDurationChange={ (pickedDuration) => {
                    // setAlarmSecond(pickedDuration.seconds);
                    // setAlarmMinute(pickedDuration.minutes);
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
            <Text style={styles.options}>Rest Time: {alarmString} </Text>
            <Button title="Name your Exercise" onPress={ promptName }></Button>
            <Text style={styles.options}>Alarm Name: { name }</Text>
            <Button title='Set Sets' onPress={ promptSets }></Button>
            <Text style={styles.options}>Sets: {sets} </Text>
            <Button title='Set Target Weight' onPress={ promptWeight }></Button>
            <Text style={styles.options}>Target Weight: {weight} </Text>
            <Button title='Set Target Reps' onPress={ promptTarget }></Button>
            <Text style={styles.options}>Target Reps: {target}</Text>
            
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
    },
    options: {
      color: 'white',
      fontSize: 25,
    }
})

export default createExercisePage;
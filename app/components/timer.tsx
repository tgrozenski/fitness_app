import { Button, Text, StyleSheet, FlatList, TouchableOpacity, Pressable, StatusBar, View, } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function Timer({alarmString} : {alarmString: String}) {

    const [state, setState] = useState("Start");
    const [timerActive, setTimer] = useState(false);

    const handleTouch = () => {
        if(state == "Pause") {
            setState("Resume");
            setTimer(false);
        }
        else if (state == "Start") {
            setTimer(true);
            timerLogic();
            setState("Resume");
        }
        else {
            setTimer(true);
            timerLogic();
            setState("Pause");
        }
    }

    const handleString = () => {
        if(!alarmString) {
            return "0:00";
        }
        else {
            return alarmString;
        }
    }

    const timerLogic = () => {
        var unix = stringtoMili(alarmString);
        var timeStarted = Date.now();
        console.log("Here is the unix time :" + unix + "Current Date: " + timeStarted + "Current State:" + timerActive);

        while(timerActive) {
            console.log("Status " + (Date.now() - timeStarted) + "Stop Time: " + unix);

            if(Date.now() >= unix + timeStarted) {
                console.log("Alarm Finished RINGGGGGGGGG")
                setTimer(false);
                break;
            }
        }
        return unix;
    }

    const stringtoMili = (alarm: String) => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{handleString()}</Text>
            <Pressable onPress={handleTouch}>
                <Text style={styles.pressableText}>{state}</Text> 
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold'
    },
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        padding: 0,
    },
    pressableText: {
        color: 'orange',
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
    }
});
import { Text, StyleSheet, Pressable, View, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import images from '../components/images';


let image = images.stop_icon;

export default function Timer( {SEC} : {SEC: number}) {

    const [state, setState] = useState("Stop");
    const[timeLeft, setTimeLeft] = useState(SEC);
    
    console.log("Timer Component is being called and rendered SEC passed--> " + SEC);

    const handleTouch = () => {
        if (state == "Stop") {
            setState("Start");
            image = images.play_icon;
            setTimeLeft(0); 
        }
        else {
            setState("Stop");
            image = images.stop_icon;
            setTimeLeft(SEC);
        }
    }
   
    const Timer_inner = ( ) => {
        console.log("Timer Inner Activated " + timeLeft );
        
        useEffect(() => {
        if (!timeLeft) {return;}
        console.log("time left " + timeLeft);

        const intervalID = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalID);

        }, [timeLeft]);

        return (
            <View style={styles.container}>
                <Text style={styles.text_black }>{secondstoString(SEC)}</Text>
                <Text style={styles.text}> {secondstoString(timeLeft)}</Text>
            </View>
        );

    }

    const secondstoString = (seconds: number) => {
        
        var string  = '';
        var minutes;

        if(seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds - Math.floor(minutes * 60);
        string += minutes
        }
        else {
            string += '0' 
        }
        string += ':';
        if (seconds < 10) {
            string+= '0' + seconds;
        }
        else {
            string+= seconds;
        }
        return string;
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{Timer_inner()}</Text>
            <View></View>
            <Pressable onPress={handleTouch}>
                {/* <Text style={styles.pressableText}>{state}</Text>  */}
                <Image style={styles.image} source={image}></Image>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        color: '#3D5168',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold'
    },
    text_black: {
        justifyContent: 'center',
        color: 'black',
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
        color: 'black',
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
    },
    image: {
        width: 35,
        height: 35,
      }
});
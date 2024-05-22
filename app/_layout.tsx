import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {

    return (
        <Stack>
            <Stack.Screen name="index" ></Stack.Screen>
            <Stack.Screen name="pages/Home" options={{ headerShown: false, headerTitle: 'Home'}}></Stack.Screen>
            <Stack.Screen name="pages/exerciseList" options={{ headerTitle:'Exercise List' }}></Stack.Screen>
            <Stack.Screen name='pages/createExercise' options={{ headerTitle:'Create Exercise' }}></Stack.Screen>
            <Stack.Screen name='pages/editExercise' options={{ headerTitle:'Edit Exercise' }}></Stack.Screen>
        </Stack>
    );
};

export default RootLayout
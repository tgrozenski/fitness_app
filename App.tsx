import React, { useState } from 'react';
import * as TaskManager from 'expo-task-manager';
import { Redirect } from "expo-router";

const App = () => {

  const func = () => {
    console.log("Task manager Returned True");
  }
  TaskManager.isAvailableAsync().then(func)

  return <Redirect href="pages/Home" />;
};
export default App;


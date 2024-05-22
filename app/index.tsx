import React from "react";
import { Redirect } from "expo-router";
// import * as TaskManager from 'expo-task-manager';


const Index = () => {
  // const func = () => {
  //   console.log("Task manager Returned True");
  // }
  // TaskManager.isAvailableAsync().then(func)
  return <Redirect href="pages/Home" />;
};
export default Index;
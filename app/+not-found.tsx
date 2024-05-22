import React from "react";
import { Redirect } from "expo-router";

const notFound = () => {

  return <Redirect href="pages/Home" />;
};
export default notFound;
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Account from "../screens/Account";

const AccountScreen = ({ route }) => {
  // console.log(route.params._id, "<<");
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      {/* <Stack.Screen name="Account" component={Account} initialParams={{ _id: route.params._id }} /> */}
    </Stack.Navigator>
  );
};
export default AccountScreen;

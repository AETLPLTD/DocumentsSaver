import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ForgetPassword from '../screens/ForgetPassword';
import Otp from '../screens/Otp';
import Scan from '../screens/Scan';
import CameraScreen from '../screens/Camera';
import Reciepts from '../screens/Reciepts';
import ShowImage from '../screens/ShowImage';
import Colors from '../components/Colors';
import {StatusBar} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';

const Stack = createNativeStackNavigator();

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const appTheme = isDarkTheme ? Colors.dark : Colors.light;
  React.useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeThemeEvent',
      data => {
        setIsDarkTheme(data);
      },
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });
  return (
    <>
      <StatusBar hidden />
      {
        <NavigationContainer theme={appTheme}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
            <Stack.Screen name="Reciepts" component={Reciepts} />
            <Stack.Screen name="ShowImage" component={ShowImage} />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
}

export default App;

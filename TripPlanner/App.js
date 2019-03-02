import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import TripsSreen from "./src/screens/TripsScreen";
import TripScreen from "./src/screens/TripScreen";
import AddTripScreen from './src/screens/AddTripScreen';
import AddPointScreen from './src/screens/AddPointScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Trips: TripsSreen,
  Trip: TripScreen,
  AddTrip: AddTripScreen,
  AddPoint: AddPointScreen,
},{ initialRouteName: 'Trips' });

export default createAppContainer(AppNavigator);


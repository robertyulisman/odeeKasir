import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';

import Dashboard from '../../pages/Dashboard';
import AuthPage from '../../pages/AuthPage';
import Login from '../../pages/Login';

const AuthStack = createStackNavigator(
  {Login},
  {
    headerMode: 'none',
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Dashboard,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const Router = createSwitchNavigator(
  {
    AuthPage,

    AuthStack,
    HomeStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AuthPage',
  },
);

export default createAppContainer(Router);

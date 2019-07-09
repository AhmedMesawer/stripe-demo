import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Navigator = createStackNavigator({
    signin: {
        screen: SignIn,
        navigationOptions:{
            header: null
        }
    },
    signup: {
        screen: SignUp,
        navigationOptions:{
            header: null
        }
    }
});

export default createAppContainer(Navigator);
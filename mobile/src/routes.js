import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main.js'
import Profile from './pages/Profile.js'

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions:{
                title:'FindDev'
            }
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                title:'Perfil no Github'
            }
        }
    },{
        defaultNavigationOptions:{
            headerTitleAlign:'center',
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#7d40e7'
            }
        }
    })
)

export default Routes
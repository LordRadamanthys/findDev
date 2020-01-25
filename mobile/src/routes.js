import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main.js'
import Profile from './pages/Profile.js'
import Account from './pages/Account.js'

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
        },
        Account:{
            screen: Account,
            navigationOptions:{
                title:'Conta'
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
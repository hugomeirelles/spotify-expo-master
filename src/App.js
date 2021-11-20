import * as React from 'react';
import { StatusBar, View, Text, StyleSheet, Button } from 'react-native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import { func } from './constants';
import  {axios} from 'axios';


// main navigation stack
import Stack from './navigation/Stack';
import { color, greaterThan } from 'react-native-reanimated';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSongData: {
        album: 'Swimming',
        artist: 'Mac Miller',
        image: 'swimming',
        length: 312,
        title: 'So It Goes'
      },
      isLoading: true,
      token_acess:'',
      toggleTabBar: false,
      pageError:''
    };

    this.changeSong = this.changeSong.bind(this);
    this.setToggleTabBar = this.setToggleTabBar.bind(this);
    this.token_acess = '10101010101010';
  }

  async getAuth(){
    console.info('axios conexao...');
    try {
      params = {
        response_type: 'code',
        client_id: '665282b75b4e4e7a83d32ddd07d7591c',
        scope: 'user-read-private user-read-email',
        state: state
      }

      const api = axios.create({
        baseURL: 'http://localhost:8888',
        URL:'/login'
      });
  
      console.info('getAuth...')
  
      api.get('/Login')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });       
    } catch (error) {
      this.setState({pageError:error})
    }
   
  }

  setToggleTabBar() {
    this.setState(({ toggleTabBar }) => ({
      toggleTabBar: !toggleTabBar
    }));
  }

  changeSong(data) {
    this.setState({
      currentSongData: data
    });
  }

  render() {
    const { currentSongData, isLoading, toggleTabBar, token_acess } = this.state;

    if(true){
      return(
        <View style={{marginTop:50}}>
          <Button 
            onPress={this.getAuth}
            title="Autorização"
            color="#841584"
            accessibilityLabel="teste de rota para login"
          />
        </View>
      )
    }
 
    
    if (isLoading) {
      return (
        <AppLoading
          onError={() => {
            // console.warn
          }}
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />

        <Stack
          screenProps={{
            currentSongData,
            changeSong: this.changeSong,
            setToggleTabBar: this.setToggleTabBar,
            toggleTabBarState: toggleTabBar
          }}
        />
      </React.Fragment>
    );
  }
}

registerRootComponent(App);

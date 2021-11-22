import React from 'react';
import { StatusBar, View, Text, StyleSheet, Button } from 'react-native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import { func } from './constants';
import  axios from 'axios';
// main navigation stack
import Stack from './navigation/Stack';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSongData: {
        album: 'Swimming',
        artist: 'Mac Miller',
        image: 'swimming',
        length: 312,
        title: 'So It Goes'
      },
      isLoading: true,
      cod_acess:'',
      token_acess:'',
      data:[],
      toggleTabBar: false,
      pageError:''
    };

    this.changeSong = this.changeSong.bind(this);
    this.setToggleTabBar = this.setToggleTabBar.bind(this);
  }

  setCodAcess(){
    console.info('Chamada setCodAcess():');
    try {
      axios.get('https://backspotyfy.herokuapp.com/login')
        .then(response => {
          console.info('setando resposta...');
          console.info(response.data); 
          console.info('cod_acess:'+response.data.client_secret)
        }).catch((error) => { 
          console.log('Erro ao receber dados:'+error)
        })
    } catch (error) {
      console.info(error)
    }
  }

  componentDidMount(){
    
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
            onPress={this.setCodAcess}
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

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';


import Forecast from "./Forecast";
import fetchForecast from "./actions";

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { zip: "", forecast: null };
  }

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecase(zip)
        .then(forecast => {
            this.setState({forecast});
        });
  }

  render() {
      let content = null;
      if(this.state.forecast !== null) {
          const { main, description, temp } = this.state.forecast;
          content = (
              <Forecast
                main={main}
                description={description}
                temp={temp}
            />
          );
      }
    return (
      <View style={styles.container}>
        <Image source={require('./nature.png')}
               resizeMode='cover'
               style={styles.backdrop}> 
            <Text style={styles.welcome}>
            You input {this.state.zip}
            </Text>
            {content}
            <TextInput
                style={styles.input}
                onSubmitEditing={this._handleTextChange} />
            </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40
  },
  backdrop: {
      flex: 1,
      flexDirection: 'column'
  }
});

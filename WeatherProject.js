import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import { STORAGE_KEY } from "./constants";

import Forecast from "./components/Forecast";
import OpenWeatherMap from "./actions/open_weather_map";
import LocationButton from "./components/LocationButton";
import PhotoBackdrop from "./components/PhotoBackdrop";

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { zip: "", touched: { zip: false }, forecast: null };
  }

  componentDidMount() {
      AsyncStorage
          .getItem(STORAGE_KEY)
          .then(value => {
              if(value !== null) {
                  OpenWeatherMap.fetchForecastForZip(value);
              }
          })
          .catch(error => {
              console.log("AsyncStorage error: " + error.message);
          })
          .done();
  }

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecast(zip)
        .then(forecast => {
            this.setState({forecast});
        });
  }

  _handleBlur = (field) => (event) => {
      this.setState({ touched: { ...this.state.touched, [field]: true }})
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
        <PhotoBackdrop>
          <View style={styles.container}>
                   resizeMode='cover'
                   style={styles.backdrop}>
                <View style={styles.overlay}>
                    <View style={styles.row}>
                        <Text style={styles.mainText}>
                            Current weather for
                        </Text>
                        <View style={styles.zipContainer}>
                            <TextInput
                                style={[styles.zipCode, styles.mainText]}
                                onSubmitEditing={event => this._handleTextChange(event)}
                                onBlur={this._handleBlur('zip')}
                                underlineColorAndroid="transparent"
                                keyboardType="numeric"
                            />
                            <LocationButton onGetCoords={OpenWeatherMap.fetchForecastForCoords}/>
                        </View>
                    </View>
                {content}
                </View>;
            </View>
        </PhotoBackdrop>
    );
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
    backdrop: {
      flex: 1,
      flexDirection: 'column'
  },
    overlay: {
      paddingTop: 5,
        backgroundColor: '#000000',
        opacity: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
      padding: 30
    },
    zipContainer: {
      height: baseFontSize + 10,
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      marginLeft: 5,
      marginTop: 3
    },
    zipCode: {
      flex: 1,
      flexBasis: 1,
      width: 50,
      height: baseFontSize
    },
    mainText: {
      fontSize: baseFontSize,
      color: '#ffffff'
    }
});

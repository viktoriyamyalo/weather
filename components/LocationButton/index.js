import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from './reusable/Button';
import styles from './style.js';

class LocationButton extends Component {
    _onPress() {
        navigator.geolocation.getCurrentPosition(
            initialPosition => {
                this.props.onGetCoords(
                    initialPosition.coords.latitude,
                    initialPosition.coords.longitude
                );
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }
    render() {
        return (
            <Button
                label="Use Current Location"
                onPress={this._onPress.bind(this)}
            />
        );
    }
}

LocationButton.propTypes = {};

export default LocationButton;

import React from 'react';
import { View, Text, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';

import assets from './assets';
import style from './styles';
import styles from './styles';
import isIphoneX from '../../utils/IsIphoneX'

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        show: false
    }
    handleCounter = () => {
        this.setState({
            show: !this.state.show 
        });
    }
    render() {

        //const textoStyle = this.state.counter % 2 === 0 ? {color:'red'} : null; //teste feito para testar o toque do botao

        return (
            <ImageBackground
                source={assets.background}
                imageStyle={{ resizeMode: 'stretch' }}
                style={style.background}
            >
                <View style={style.logoTrip}>
                    <Image source={assets.Tripplanner}
                        style={styles.dimLogoTrip}
                    />
                </View>
                <View style={style.logoDev}>
                    <Image source={assets.devPleno}
                      style={styles.dimLogoDev}
                    />
                </View>
                {
                    //codigo java script dentro das tagas, sempre deve retornar algo
                    !this.state.show ? 
                    <TouchableWithoutFeedback onPress={this.handleCounter}>
                        <View style={[style.divBut, , isIphoneX()?{marginBottom:32}:null]}>
                            <Text style={style.textoBut}>Começar </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Trips')}>
                        <View style={style.divEmptyStateBut}>
                            <Image source={assets.pin} style={style.dimPin}/>
                            <Text style={style.textoEmptyStateBut}>Vamos planejar sua primeira viagem? </Text>
                            <Image source={assets.arrow} style={[style.dimArrow, isIphoneX()?{marginBottom:16}:null]}/>
                        </View>
                    </TouchableWithoutFeedback>
                }

            </ImageBackground>
        );
    }

}

export default HomeScreen;

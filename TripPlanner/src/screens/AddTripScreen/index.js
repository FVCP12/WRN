import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './styles';

class AddTripScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        trip: '',

    }
    handleSave = async() => {
        const trip = {
            id: new Date().getTime(),
            trip: this.state.trip,
            price: 0,
            latitude: 0,
            longitude: 0,
        }
        const tripsAS = await AsyncStorage.getItem('trips')
        let trips = []
        if(tripsAS){ // truthy não (null, underfined, 0)
          trips = JSON.parse(tripsAS)
        }
        trips.push(trip);
        await AsyncStorage.setItem('trips', JSON.stringify(trips));
        //this.props.navigation.navigate('AddPoint', { id: trip.id });
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
    }
    renderItem = item => {
        return (
            <View style={styles.item}>
                <View style={styles.wrapperInfo}>
                    <Text style={styles.itemName}>{item.item.name}</Text>
                    <Text>{item.item.description}</Text>
                </View>
                <View style={styles.wrapperInfo}>
                    <Text style={styles.wrapperItemPrice}>{item.item.price}</Text>
                </View>
            </View>
        );
    }
    render() {
        const trip = {
            name: 'Eurotrip 2019',
            price: 'R$ 5000',
            places: [
                { id: '1', name: 'Amsterdan', description: 'Chegada', price: 100, lat: 0, long: 0 },
                { id: '2', name: 'Bruxelas', description: 'Hospedagem', price: 100, lat: 0, long: 0 },
            ]
        }
        return (
            <View style={styles.wrapper}>
                <TextInput style={styles.input} placeholder='Nome da viagem' onChangeText={ txt => this.setState({ trip: txt })}/>
                <TouchableOpacity style={styles.bnt} onPress={this.handleSave}>
                    <Text style={{textAlign:'center'}}>Salvar Viagem</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddTripScreen;
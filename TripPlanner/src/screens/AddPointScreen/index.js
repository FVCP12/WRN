import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, AsyncStorage } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';

class AddPointScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        id: new Date().getTime(),
        position: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
        pointName: '',
        description: '',
        price: 0,
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
    handleSave = async() =>{
        //console.log('id', this.props.navigation.state.params.id);
        const id = this.props.navigation.state.params.id;
        const pointsAs = await AsyncStorage.getItem('trip-'+id);
        let points = []
        if(pointsAs){
            points = JSON.parse(pointsAs);
        }
        points.push(this.state);
        await AsyncStorage.setItem('trip-'+id, JSON.stringify(points));

        let total = 0;
        points.forEach(p => {
            total+=p.price;
        });

        const tripsAs = await AsyncStorage.getItem('trips');
        let trips = []
        if(tripsAs){
            trips = JSON.parse(tripsAs)
        }
        trips.forEach( (trip, index) => {
            if(trip.id===id){
                trips[index].price = total;
                trips[index].latitude = points[0].position.latitude;
                trips[index].longitude = points[0].position.longitude;
            }
        });

       // console.log(trips);
        await AsyncStorage.setItem('trips', JSON.stringify(trips));
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();

    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <MapView style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                            }}
                            onDragEnd={
                                (evt) => this.setState({ position: evt.nativeEvent.coordinate })
                            }
                            draggable
                        />
                    </MapView>
                    <View style={styles.backButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../../assets/arrow-2.png')}
                                style={{
                                    width: Dimensions.get('window').width / 12,
                                    height: Dimensions.get('window').height / 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput style={styles.input} placeholder='Nome do ponto' onChangeText={ txt => this.setState({ pointName: txt })}/>
                <TextInput style={styles.input} placeholder='Descrição' onChangeText={ txt => this.setState({ description: txt })}/>
                <TextInput style={styles.input} placeholder='Preço' onChangeText={ txt => this.setState({ price: parseFloat(txt) })}/>
                <TouchableOpacity style={styles.bnt} onPress={this.handleSave}>
                    <Text style={{textAlign:'center'}}>Salvar Ponto</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddPointScreen;
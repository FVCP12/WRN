import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Trip from './Trip';
import isIphoneX from '../../utils/IsIphoneX'
import MapView from 'react-native-maps';

class TripsScreen extends Component {
    static navigationOptions = {
        header: null
    };
    state = {
        trips: []
    }
    renderItem = ({item}) => {
        return <Trip onPress={() => {
            this.props.navigation.navigate('Trip', { id: item.id, refresh: this.loadData})
        }} titulo={item.trip} preco={item.price} />
    };
    componentDidMount(){
        this.loadData();
    }
    loadData = async() =>{

      //  await AsyncStorage.clear(); //para apagar tudo
        const tripsAS = await AsyncStorage.getItem('trips');
        let trips = []
        if(tripsAS){
            trips = JSON.parse(tripsAS)
        }
        this.setState({ 
            trips: trips // ou somente trips nesse caso por ter o mesmo nome
        });

    }
    handleItemChange = info => {
        const { viewableItems } = info;
        if(viewableItems && viewableItems.length > 0){
            const [item] = viewableItems;
            this.map.animateToRegion(
                this.regionFrom(item.item.latitude,item.item.longitude, 1000),
                2000
            );
            
        }
    }
    regionFrom = (lat, lon, distance) => {
        distance = distance/2
        const circumference = 40075
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000
        const angularDistance = distance/circumference

        const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
        const longitudeDelta = Math.abs(Math.atan2(
                Math.sin(angularDistance)*Math.cos(lat),
                Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

        return result = {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    }
    render() {
        
        const {trips} = this.state; 
        /*[
            { id: '1', name: 'EuroTrip 2019', price: 'R$ 5000'},
            { id: '2', name: 'Expedição Atacama', price: 'R$ 3000'}
        ]*/
        return (
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'stretch'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <MapView
                        style={{flex:1}}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        ref={ref => this.map = ref}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddTrip', { refresh: this.loadData })}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 5,
                            padding: 10,                            
                        }}
                    >
                           <Image 
                               source={require('../../../assets/add.png')}
                               style={{
                                   width: Dimensions.get('window').width / 8,
                                   height: Dimensions.get('window').height / 13,
                               }}
                           />
                    </TouchableOpacity>
                </View>
                <View style={{
                    backgroundColor: 'white'
                }}>
                    <FlatList
                        data={trips}
                        renderItem={this.renderItem}
                        horizontal
                        pagingEnabled
                        keyExtractor={item=>item.id.toString()}
                        style={[
                            isIphoneX() ? { marginBottom: 20 } : null
                        ]}
                        onViewableItemsChanged={this.handleItemChange}
                       // viewabilityConfig={{
                       //     itemVisiblePercentThreshold: 100
                       // }}
                    />
                </View>
            </View>
        );
    }
}

export default TripsScreen;
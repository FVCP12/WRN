import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, AsyncStorage } from 'react-native';
import styles from './styles';

class TripScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        trip: [],
        points: [],
    }
    renderItem = item => {
        return (
            <View style={styles.item}>
                <View style={styles.wrapperInfo}>
                    <Text style={styles.itemName}>{item.item.pointName}</Text>
                    <Text>{item.item.description}</Text>
                </View>
                <View style={styles.wrapperInfo}>
                    <Text style={styles.wrapperItemPrice}>R$ {item.item.price.toFixed(2)}</Text>
                </View>
            </View>
        );
    }
    componentDidMount(){
        this.loadData();
    }
    loadData = async() => {
        const id = this.props.navigation.state.params.id;
        const tripsAS = await AsyncStorage.getItem('trips');
        let trips = []
        if(tripsAS){
            trips = JSON.parse(tripsAS)
        }

        const pointsAS = await AsyncStorage.getItem('trip-'+id);
        let points = []
        if(pointsAS){
            points = JSON.parse(pointsAS)
        }
        
        let trip = {
            trip: '',
            price: 0
        }

        trips.forEach( t => {
            if(t.id === id){
                trip.trip = t.trip
                trip.price = t.price ? t.price : 0 
            }
        });

        this.setState({ 
            trip: trip, // ou somente trips nesse caso por ter o mesmo nome
            points: points,
        });

    }
    render() {
        const id = this.props.navigation.state.params.id;
        const { points, trip } = this.state;
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.state.params.refresh()
                            this.props.navigation.goBack()
                        }}>
                            <Image source={require('../../../assets/arrow-2.png')}
                                style={{
                                    width: Dimensions.get('window').width / 12,
                                    height: Dimensions.get('window').height / 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.tripName}>{trip.trip}</Text>
                    <Text style={styles.tripPrice}>
                        R$ {parseFloat(trip.price).toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddPoint', {id: id, refresh: this.loadData })}
                        style={{
                            position: 'absolute',
                            bottom: 40,
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
                <FlatList
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingTop: 16,
                        paddingLeft: 16,
                    }}
                    keyExtractor={item=>item.id.toString()}
                    data={points}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

export default TripScreen;
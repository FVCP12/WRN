import { StyleSheet, Dimensions } from 'react-native';

export default style = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    dimLogoTrip: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 4,
    },
    logoTrip: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dimLogoDev: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 24,
    },
    logoDev: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 17,
    },
    divBut: {
        paddingBottom: 16,
        paddingTop: 16,
        backgroundColor: 'white'
    },
    textoBut: {
        textAlign: 'center',
        fontSize: 18
    },
    divEmptyStateBut: {
        paddingBottom: 16,
        paddingTop: 16,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textoEmptyStateBut: {
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 16,
        paddingTop: 16,
        width: Dimensions.get('window').width / 2,
    },
    dimPin: {
        width: Dimensions.get('window').width / 9,
        height: Dimensions.get('window').height / 10,  
    },
    dimArrow: {
        width: Dimensions.get('window').width / 6,
        height: Dimensions.get('window').height / 10,
    }

});
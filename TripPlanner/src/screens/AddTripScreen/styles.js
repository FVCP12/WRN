import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper:{
         flex: 1,
         paddingTop: 120,
    },
    header:{
        height: 192,
        backgroundColor: 'grey'
    },
    backButton:{
        position: 'absolute',
        top: 24,
        left: 16,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    tripName: {
        position: 'absolute',
        left: 16,
        bottom: 16,
    },
    tripPrice:{
        position: 'absolute',
        bottom: 16,
        right: 32,
        textAlign: 'right',
        backgroundColor: '#24c6dc',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 4,
        paddingLeft: 4,
        color: 'white'
    },
    item:{
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 16,
    },
    wrapperInfo:{
        flex:1
    },
    itemName:{
        fontWeight: 'bold',
        fontSize: 18
    },
    wrapperItemPrice:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
    },
    itemPrice:{
        textAlign: 'right',
        color:'#24c6dc',
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: '#e5e5e5',
        padding: 20,
        marginBottom: 16,
    },
    bnt:{
        backgroundColor: '#e5e5e5',
        padding: 20,
        marginBottom: 16,
    }

});

export default styles;
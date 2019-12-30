import {
    StyleSheet,
    Dimensions
} from "react-native"

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F7F7F7'
    },

    content:{
        flex:1,
        backgroundColor: '#FFFFFF',
        width: width - 40,
        marginHorizontal:20,
        marginVertical:10,
        padding: 20,
        paddingVertical:10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#E3E3E7',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 0.5,
    },

    topView: {
        width: '100%'
    },

    middleView: {
        width: '100%'
    },

    bottomView: {
        width: '100%'
    },

    todoDateView:{
        width: '100%'
    },

    saveButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        
        alignSelf:'center',

    },

    saveButtonView:{
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: '#368569',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        borderRadius: 23,
        height: 44,
        marginHorizontal: 10,
    },

    saveButtonTitle: {
        fontSize: 18, 
        color: 'white', 
        paddingTop: 2,
    },
});
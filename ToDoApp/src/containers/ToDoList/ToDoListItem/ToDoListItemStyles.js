import {
    StyleSheet,
    Dimensions
} from "react-native"
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems:'center',
    },

    cellBackground:{
        opacity: 1,
        position:'absolute',
        top:0,
        left:0, 
        bottom:0,
        right:0,
    },

    selectIconContainer:{
        width: 50,
        height: 50,
        padding: 5,
        alignItems:'center',
        justifyContent:'center',
    },

    selectIcon:{
        width: 30, 
        height: 30 , 
    },

    leftContent:{
        width: width - 180,
        marginVertical: 8,
    },

    titleText:{
        fontSize: 20,
        paddingHorizontal: 5,
        color:'#24B97B',
        marginBottom: 10,
        fontWeight:'bold',
    },

    contentText:{
        fontSize: 16,
        paddingHorizontal: 5,
        color:'#24B97B',
        fontWeight: '600',
    },

    timeText:{
        paddingLeft: 5,
        width: 100,
        fontSize: 14,
        color:'#24B97B',
        textAlign:'right'
    },

    bottomLine:{
        position:'absolute',
        height:1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'#E7E7E7'
    },
});
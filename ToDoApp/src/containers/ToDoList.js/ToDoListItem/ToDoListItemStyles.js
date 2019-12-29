import {
    StyleSheet
} from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
    },

    cellBackground:{
        position:'absolute',
        top:0,
        left:0, 
        bottom:0,
        right:0,
    },

    selectIconContainer:{
        width: 80,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: 5,
     
    },

    contentText:{
        flex: 2,
        fontSize: 18,
        paddingHorizontal: 5,
        fontFamily:'OpenSans',
        color:'#5c5c5c',
    },

    timeText:{
        paddingLeft: 5,
        flex: 2,
        fontSize: 18,
        fontFamily:'OpenSans',
        color:'#5c5c5c',
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
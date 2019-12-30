import {
    StyleSheet,
    Dimensions
} from "react-native"
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        
    },

    topContainer:{
        width:"100%",
        height: 80,
        flexDirection:'row',
    },

    flatListContainer:{
        flex: 1,
    },

    emptyImageContainer:{
        
    },

    emptyImage:{
        width: width,
        height: (height - 150)/2
    },

    cellButtonContainer:{
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },

    rightCellButton:{
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 75
    },

    rightCellButtonImage:{
        width:50,
        height:50,
      },
});
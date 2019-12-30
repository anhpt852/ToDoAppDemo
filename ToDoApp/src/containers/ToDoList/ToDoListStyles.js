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
});
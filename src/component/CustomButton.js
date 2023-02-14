import React from 'react'
import { StyleSheet,View,TouchableOpacity ,Text} from 'react-native'
const CustomButton = ({buttonStyle,buttonText,textStyle,onPress})=>{
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button,buttonStyle]}>
            <Text style={[styles.buttonText,textStyle]}>{buttonText}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:'red',
        borderRadius:25,
    },
    buttonText:{
        colot:'white',
        fontSize:18,
    }
})
export default CustomButton;
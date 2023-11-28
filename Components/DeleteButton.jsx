import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';


const DeleteButton = ({
                        text = 'DONE',
                        onPress = () => {
                        },
                        disabled = false,
                        btnStyle = {},
                        isLoading = false
                    }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...styles.container,
                backgroundColor: !disabled ? '#D7654D' : 'grey',
                ...btnStyle,

            }}
            disabled={disabled}
        >
            {isLoading ? <ActivityIndicator size={'small'}/> : <Text style={styles.textStyle}>{text}</Text>}


        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 52,
        borderRadius:18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,

    },

    textStyle: {
        fontSize: 15,
        fontFamily:'poppins_bold',
        color:'white'
    }
});

//make this component available to the app
export default DeleteButton;

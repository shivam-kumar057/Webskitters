import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, Alert, FlatList, Keyboard, Image } from 'react-native'
import Header from '../component/Header';
import { useSelector, useDispatch } from 'react-redux'
import CustomButton from '../component/CustomButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const { height, width } = Dimensions.get("screen")
import { fetchUserData, addUserData, deleteUserData, updateUserData } from '../redux/actions/FirebaseAction'
const HomeScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    const [length, setLength] = useState(0)
    const [update, setUpdate] = useState(false)
    const [indexData, setIndexData] = useState(0)
    const firebaseData = useSelector((state) => state.firebaseData.list == null ? [] : state.firebaseData.list)
    const [imageUrl, setImageUrl] = useState('')
    const dispatch = useDispatch()

    var id = 0
    useEffect(() => {
        dispatch(fetchUserData())
    }, [])
    const refreshInput = () => {
        setName('')
        setPrice('')
        setOfferPrice('')
        setImageUrl('')
        Keyboard.dismiss()
    }

    const addData = (id) => {
        try {
            if (name && price && offerPrice && imageUrl) {
                const index = firebaseData?.length || 0;
                let data = { "name": name, "price": price, "offerPrice": offerPrice, "imageUrl": imageUrl }
                dispatch(addUserData(data, index))
                refreshInput()
            } else {
                Alert.alert("please fill all input")
            }
        } catch (err) {
            console.log("addData ==", err);
        }
    }
    const editData = (index, item) => {
        try {
            setIndexData(index)
            setUpdate(true)
            setName(item.name)
            setPrice(item.price)
            setOfferPrice(item.offerPrice)
            setImageUrl(item.imageUrl)
        } catch (err) {
            console.log("editData==",err);
        }
    }
    const handleUpdate = async () => {
        let data = { "name": name, "price": price, "offerPrice": offerPrice, "imageUrl": imageUrl }
        dispatch(updateUserData(data, indexData))
        setUpdate(false)
        refreshInput()
    }
    const onDelete = async (index, item) => {
        try {
            dispatch(deleteUserData(index))
        } catch (err) {
            console.log("onDelete==",err);
        }
    }
    const clickPhoto = () => {
        return Alert.alert('', 'Select Options', [
            {
                text: 'Camera',
                onPress: () => {
                    openCamera();
                },
            },
            {
                text: 'Gallary',
                onPress: () => {
                    openGallery();
                },
            },
        ]);
    }
    const openCamera = () => {
        const options = {
            storageOptions: {
                path: 'Images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };
        launchCamera(options, response => {
            let url = 'data:image/jpeg;base64,' + response?.assets[0]?.base64
            setImageUrl(url)
        });
    };
    const openGallery = () => {
        const options = {
            storageOptions: {
                path: 'Images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };
        launchImageLibrary(options, response => {
            let url = 'data:image/jpeg;base64,' + response?.assets[0]?.base64
            setImageUrl(url)
        });

    };
    const renderItem = ({ item, index }) => {
        if (item != null) {
            return (
                <View style={styles.renderDataContainer}>
                    <View style={styles.mainCOntainer}>
                        <View style={styles.innterView}>
                            <Text style={styles.textHeader}>name :</Text>
                            <Text style={styles.textData}>{item.name}</Text>
                        </View>
                        <View style={styles.innterView}>
                            <Text style={styles.textHeader}>price :</Text>
                            <Text style={styles.textData}>{item.price}</Text>
                        </View>
                        <View style={styles.innterView}>
                            <Text style={styles.textHeader}>offerPrice :</Text>
                            <Text style={styles.textData}>{item.offerPrice}</Text>
                        </View>
                        <View style={[styles.imageStyle, { marginLeft: 10 }]}>
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={styles.imageStyle}
                            />
                        </View>
                    </View>
                    <View style={styles.editDeleteButtonContainer}>
                        <CustomButton
                            buttonStyle={styles.editButtonStyle}
                            buttonText={'Edit'}
                            onPress={() => editData(index, item)}
                        />
                        <CustomButton
                            buttonStyle={styles.deleteButtonStyle}
                            buttonText={'delete'}
                            onPress={() => onDelete(index, item)}
                        />
                    </View>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ flex: 1 }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Enter value'
                        style={styles.inputText}
                        onChangeText={(text) => setName(text)}
                        value={name}

                    />
                    <TextInput
                        placeholder='Price'
                        style={styles.inputText}
                        onChangeText={(text) => setPrice(text)}
                        value={price}
                        keyboardType='numeric'
                    />
                    <TextInput
                        placeholder='offerPrice'
                        style={styles.inputText}
                        onChangeText={(text) => setOfferPrice(text)}
                        value={offerPrice}
                        keyboardType='numeric'
                    />
                    <CustomButton
                        buttonStyle={styles.buttonStyle}
                        buttonText={'click Photo'}
                        onPress={() => clickPhoto()}
                    />
                    <CustomButton
                        buttonStyle={styles.addEditButtonStyle}
                        buttonText={update ? 'Edit' : 'Add'}
                        onPress={() => { !update ? addData(++id) : handleUpdate() }}
                        textStyle={{ color: 'white' }}
                    />
                </View>
                <FlatList
                    data={firebaseData}
                    keyExtractor={(item) => item?.index}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputText: {
        width: width - 50,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        margin: 10

    },
    innterView: {
        flexDirection: 'row',
        width: width / 1.3,
        justifyContent: 'flex-start',
        alignItems: 'center', marginLeft: 10
    },
    inputContainer: {
        height: height / 2,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonStyle: {
        width: width - 50, height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10, borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black'
    },
    addEditButtonStyle: {
        width: width - 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#262626'
    },
    editDeleteButtonContainer: {
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    editButtonStyle: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor:'green'
    },
    deleteButtonStyle: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    textHeader: {
        fontSize: 20
    },
    textData: {
        left: 10
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    renderDataContainer: {
        height: height / 6,
        width: width / 1.1,
        backgroundColor: 'white',
        margin: 10,
        elevation: 0.6,
        borderRadius: 10,
        flexDirection: 'row'
    },
    mainCOntainer:{
         width: "50%",
          backgroundColor: 'white'
         }
})
export default HomeScreen;
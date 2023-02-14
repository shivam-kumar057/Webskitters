import database from '@react-native-firebase/database';

export const addUserData = (data, index) => {
    return (dispatch) => {
        database().ref(`userList/${index}`).set(data)
        dispatch(fetchUserData())
    }
}

export const fetchUserData = () => {
    return (dispatch) => {
        database().ref('userList').on('value', (tempData) => {
            dispatch({ type: 'setUserData', payload: tempData.val() })
        })
    }
}
export const updateUserData = (data, index) => {
    return (dispatch) => {
        database().ref(`userList/${index}`).update(data)
        dispatch(fetchUserData())
    }
}

export const deleteUserData = (index) => {
    return (dispatch) => {
        database().ref(`userList/${index}`).remove();
        dispatch(fetchUserData())
    }
}
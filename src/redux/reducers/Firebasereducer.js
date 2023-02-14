const initialData = {
    list: []
}

const firebaseReducers = (state = initialData, action) => {
    switch (action.type) {
        case "setUserData":
            return { ...state, list: action.payload }
        default:
            return state;
    }
}

export default firebaseReducers;
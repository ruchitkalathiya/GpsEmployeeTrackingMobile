import {SET_USER, IS_AUTHTHENTICATED,STORAGE_KEY_ONBOARDINGSCREEN} from '../action/action.types'

const initialState = {
    user: null,
    loading: true,
    isAuthenticated: false,
    storage_Key_OnboardingScreen:false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case IS_AUTHTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload,
                loading: false
            } 
            case STORAGE_KEY_ONBOARDINGSCREEN:
                return {
                    ...state,
                storage_Key_OnboardingScreen: action.payload,
                loading: false
            } 
    
        default:
            return state
    }
}
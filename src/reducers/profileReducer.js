import {
    SUCCESS_PROFILE_LOADING,
} from '../actions/profileActions';

const initialStore = {
    profile: {},
    isProfileLoaded: false,
};

export default function profileReducer(store = initialStore, action) {
    switch (action.type) {
        case SUCCESS_PROFILE_LOADING: {
            return { 
                profile: action.payload.profile, 
                isProfileLoaded: true 
            };
        }
        default:
            return store;
    }
}
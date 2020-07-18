import { SET_ACTIVE_TRACK } from '../action/actionTypes';


const initialState = {
    audioTrack: null,
    isPlaying: false,
};

const audioReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_TRACK:
            return {
                ...state,
                audioTrack: action.playload,
                isPlaying: true,
            }
        default: return state
    }
}

export default audioReducer;

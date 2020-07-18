import {SET_ACTIVE_TRACK, PLAY_TRACK} from './actionTypes';

export const  setActiveTrack = (activeTrack) => {
    return {
        type: SET_ACTIVE_TRACK,
        playload: activeTrack,
    }
}

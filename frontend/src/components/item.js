import React, {useEffect, useState, useRef } from 'react';
import {connect} from "react-redux";
import * as VanillaTilt from 'vanilla-tilt';
import { setActiveTrack } from '../store/action/play';
import Skeleton from '@material-ui/lab/Skeleton';


function Card(props) {
    const [loading, setLoading] = useState(true);
    const audioRef = useRef(null);
    const { audioTrack } = props;
    const itemRef = useRef(null);

    useEffect(() => {
        VanillaTilt.init(itemRef.current, {
            max: 2,
            speed: 400,
            reverse: true,
            scale: 1.05,
        });
        props.data.length < 1 ? setLoading(true): setLoading(false);
    })
    if (audioRef.current && props.data.id !== audioTrack) {
        audioRef.current.pause();
    }

    const setActiveTrackHandler = () => {
        const { id } = props.data;
        const { dispatch } = props;
        dispatch(setActiveTrack(id))
    }

    const addScale = () => {
        itemRef.current.childNodes[1].style.transform = `scale(1.1)`;
    }

    const removeScale = () => {
        itemRef.current.childNodes[1].style.transform = `scale(1)`;
    }
    console.log(props.data)
    return (
        <div className="item__container" 
         onMouseOver={addScale} 
         onMouseLeave={removeScale}
         ref={itemRef}
        >
            {
                loading ? (
                    <div>
                    <Skeleton variant="rect" width={`100%`} height={350} />
                  </div>
                ) : (
                    <>
                        <img 
                         src={props.data.album.images[Math.floor(Math.random() * props.data.album.images.length)].url} 
                         style={{width: '90%', borderRadius: '10px'}} alt={props.data.name}
                        />
                        <div style={{color: '#fafafa', transition:`transform .3s ease`}}>
                            <p>Title: {props.data.name}</p>
                            <p style={{color: 'grey', transition:`transform .3s ease`}}>Artist: {props.data.artists[0].name}</p>
                        </div>
                        <audio 
                        style={{ width:"90%"}}
                        ref={audioRef}
                        controls 
                        controlsList="nodownload"
                        src={props.data.preview_url} 
                        onPlay={setActiveTrackHandler} />
                    </>
                )
            }
        </div>
    )
}


function mapStateToProps (state){
    return {
      audioTrack: state.audio.audioTrack
    }
}
  
export default connect(mapStateToProps)(Card)

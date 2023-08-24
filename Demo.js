import React, { useState, useRef, useEffect  } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Video from 'react-native-video';
// import LiveVideoPlayer from './LiveVideoPlayer';
// import PipHandler, { usePipModeListener } from 'react-native-pip-android';


const Demo = () => {
  const[paused,setPaused]=useState(false) //to keep a track of when user clicks on video(for pause/play)
  const[playback,setPlayback] = useState(30)
  const videoRef = useRef(null);

  const HLSlink = 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';
  const livelink = 'https://live-par-1-abr-cdn.livepush.io/live_abr_cdn/emaIqCGoZw-6/index.m3u8';
  const mp4link = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const newlink = 'https://abphindi-ht.vidgyor.com/v1/master/3b48e218addf61132f4eb1c584495b7308b8fafa/abphindi-prod-ht/master.m3u8'

  const handleClick = () => {
    // setClicked(!clicked);
  };

  const handleResume = ()=>{
    setPaused(false);
    // setPlayback(300000000000000000);
    if(videoRef.current){
      videoRef.current.seek(59);
    }
  }

  const handlePlayPause = ()=>{
    setPaused(!paused)
  }

  const onProgress = (data)=>{
    const {currentTime } = data;
    setPlayback(currentTime);
    // console.warn(currentTime);
  }

  return (
    <View style={{flex:1,backgroundColor:'yellow'}}>
      {/* <LiveVideoPlayer/> */}
      <Video
        ref = {videoRef}
        style={{width:'100%',height:300,zIndex:10}}
        source={{uri : newlink}}
        resizeMode='contain'
        controls={true}
        paused={paused}
        currentPlaybackTime= {playback}
        onProgress = {onProgress}
      />
     
      {
        paused==false && playback>=50.000? (
          <TouchableOpacity onPress={handleResume} >
            <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>Live</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleResume} >
            <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>Go Live</Text>
          </TouchableOpacity>
        )
      }

      <Button onPress={handlePlayPause} title={paused? "Play" : "Pause"}></Button>
    
    </View>
    
  )
}


export default Demo

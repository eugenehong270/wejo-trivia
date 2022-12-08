import React, { useState, useRef } from 'react'
// import {
//   styled, Typography, Slider,
//   Paper, Stack, Box
import {
  styled, Stack, Box
} from '@mui/material';


// #region ------------ ICONS ---------
// import VolumeDownIcon from '@mui/icons-material/VolumeDown';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import PauseIcon from '@mui/icons-material/Pause';
// import FastRewindIcon from '@mui/icons-material/FastRewind';
// import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// #endregion ------------ ICONS ---------

// #region ------- Tracts -------------------------------------------------------
import charm from '../assets/music/charmaggedon.mp3';
import jazz from '../assets/music/jazz_lofi_freestyle.mp3'
// #endregion ---------------------------------------------------------------

// #region -------- Styled Components -----------------------------------------
const Div = styled('div')(({ theme }) => ({
  // backgroundColor: 'white',
  height: '0vh',
  width: '5vw',
  paddingTop: theme.spacing(0.5)
}))


// #endregion ---------------------------------------------------------------


const playlist = [charm, jazz];


export default function Soundtrack() {
  const audioPlayer = useRef()

  const [index, setIndex] = useState(0);

  const [currentSong] = useState(playlist[index]);

  const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(30);
  // const [mute, setMute] = useState(false);

  // const [elapsed, setElapsed] = useState(0);
  // const [duration, setDuration] = useState(0);

  // useEffect(() => {
  //   if (audioPlayer) {
  //     audioPlayer.current.volume = volume / 100;
  //   }


  //   if (isPlaying) {
  //     setInterval(() => {
  //       const _duration = Math.floor(audioPlayer?.current?.duration);
  //       const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

  //       setDuration(_duration);
  //       setElapsed(_elapsed);
  //     }, 100);
  //   }

  // }, [
  //   volume, isPlaying
  // ]);

  // function formatTime(time) {
  //   if (time && !isNaN(time)) {
  //     const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
  //     const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

  //     return `${minutes}:${seconds}`;
  //   }
  //   return '00:00';
  // }

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play()
    } else {
      audioPlayer.current.pause()
    }
    setIsPlaying(prev => !prev)
  }

  const toggleSkipForward = () => {
    if (index >= playlist.length - 1) {
      setIndex(0);
      audioPlayer.current.src = playlist[0];
      audioPlayer.current.play();
    } else {
      setIndex(prev => prev + 1);
      audioPlayer.current.src = playlist[index + 1];
      audioPlayer.current.play();
    }
  }

  const toggleSkipBackward = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      audioPlayer.current.src = playlist[index - 1];
      audioPlayer.current.play();
    }
  }

  // function VolumeBtns() {
  //   return mute

  // }
  return (
    <Div>
      {/* <audio src={currentSong} ref={audioPlayer} muted={mute} /> */}
      <audio src={currentSong} ref={audioPlayer} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction='row' spacing={1}
          sx={{
            display: 'flex',
            width: '10%',
            alignItems: 'center'
          }}>
          <SkipPreviousIcon
            sx={{
              color: 'white',
              '&:hover': { color: '#3498db' }
            }}
            onClick={toggleSkipBackward} disabled={true} />
          {!isPlaying
            ? <PlayArrowIcon fontSize={'large'} sx={{ color: 'white', '&:hover': { color: '#3498db' } }} onClick={togglePlay} />
            : <PauseIcon fontSize={'large'} sx={{ color: 'white', '&:hover': { color: '#3498db' } }} onClick={togglePlay} />
          }
          <SkipNextIcon sx={{ color: 'white', '&:hover': { color: '#3498db' } }} onClick={toggleSkipForward} />
        </Stack>
      </Box>
    </Div>
  )
}

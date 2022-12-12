import React, { useState, useRef } from 'react'
import {
  styled, Stack, Box
} from '@mui/material';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import charm from '../assets/music/charmaggedon.mp3';
import jazz from '../assets/music/jazz_lofi_freestyle.mp3'
import perfect from '../assets/music/a_perfect_love_wejo.mp3';

const Div = styled('div')(({ theme }) => ({
  height: '0vh',
  width: '5vw',
  paddingTop: theme.spacing(0.5)
}))

const playlist = [charm, jazz, perfect];


export default function Soundtrack() {
  const audioPlayer = useRef()

  const [index, setIndex] = useState(0);

  const [currentSong] = useState(playlist[index]);

  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <Div>
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

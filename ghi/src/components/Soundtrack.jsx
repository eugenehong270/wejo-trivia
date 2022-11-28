import { useState } from 'react'
import { songLinks } from '../constants'
import sound from '../assets/sound.svg'

const Soundtrack = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const audioElement = new Audio(songLinks[currentIndex]['url'])
    const paused = (audioElement) => {
        return audioElement.paused;
    }

  return (
    <img style={{ maxWidth: 40 }} onClick={ audioElement.play() } src={sound} />
  )
}

export default Soundtrack

import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from "three"
import GLOBE from 'vanta/dist/vanta.globe.min.js'
import Logo from '../../assets/logo.png'
import Metadata from '../Metadata/Metadata'
import './Landing.css'
const Landing = () => {

    const [Waves, setWaves] = useState(null);
    const [Globe, setGlobe] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        console.log(ref);
        if (!Globe) {
            setGlobe(GLOBE({
                el:ref.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xff8600,
                backgroundColor: 0x0
              }))
        }

        return () => {
            if (Globe) Globe.destroy()
          }
        
      }, [Globe])

  return (
    
    
    

    <div className='hell'>
        <Metadata title='WELCOME !' />
        <main ref={ref} className="main">
            <Link to="/" className='land2' >
                <div className='land'>
                    <img src={Logo} className="civil"></img>
                </div>
            </Link>
        </main>
        
    </div>
  )
}

export default Landing
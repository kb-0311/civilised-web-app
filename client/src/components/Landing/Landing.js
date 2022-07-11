import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from "three"
import WAVES from 'vanta/dist/vanta.waves.min.js'
import Logo from '../../assets/logo.png'
import './Landing.css'
const Landing = () => {

    const [Waves, setWaves] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        console.log(ref);
        if (!Waves) {
            setWaves(WAVES({
                el:ref.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: "200.00",
                minWidth: "200.00",
                scale: "1.00",
                scaleMobile: "1.00",
                color: 0x0,
                shininess: "50.00",
                waveHeight: "19.50",
                waveSpeed: "1.25",
                zoom: "0.79"
              }))
        }

        return () => {
            if (Waves) Waves.destroy()
          }
        
      }, [Waves])

  return (
    
    
    

    <div className='hell'>
        
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
import React from 'react';
import './Logo.css'
import Tilt from 'react-parallax-tilt';
import logoFace from './logo_face.png';

const Logo = () => {
    return (
        <div className='ma4 mt0' >
            <Tilt 
                className="Tilt br2 shadow-2" 
                tiltReverse={true} 
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                style={{ height: 150, width: 150 }} 
            >
                <div className="Tilt-inner pa3" style={{ paddingTop: '25px', paddingLeft: '22px'}}> <img src={logoFace} alt='logoFace' /> </div>
            </Tilt>
        </div>
    );    
}

export default Logo;
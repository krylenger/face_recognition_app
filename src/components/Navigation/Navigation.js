import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    
    if (isSignedIn) {
        return(
            <nav className='navigation f3 link black pa3 pointer'>
                <p 
                className='br2 shadow-3 pa2 ma3  grow'
                onClick={() => onRouteChange('signout')}>
                    Sing Out 
                </p>
            </nav>
        );
    } else {
        return(
            <nav className='navigation f3 link black pa3 pointer'>
                <p 
                className='br2 shadow-3 pa2 ma3  grow'
                onClick={() => onRouteChange('signin')}>
                Sing In 
                </p>
                <p 
                className='br2 shadow-3 pa2 ma3  grow'
                onClick={() => onRouteChange('register')}>
                 Register 
                </p>
            </nav>
        );
    }
       
  
}

export default Navigation;
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='form ma4 mt2 tc' >
            <p className='f3 pt3 '>
                {'This Magic Link will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='tc'>
                <div className='pb3 br3 pl2 pr2 center'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' 
                        onChange={onInputChange} />
                    <button
                        className='w-30 grow f4 ph3 pv2 dib white bg-black o-80 pointer'
                        onClick={onButtonSubmit} >
                        {'Detect'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ImageLinkForm;
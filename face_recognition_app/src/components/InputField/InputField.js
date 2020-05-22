import React from 'react';

const InputField = ({name, handleChange}) => {
    return(
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">{name}</label>
            <input
                className="pa2 pl3 pr3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id={name}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputField;
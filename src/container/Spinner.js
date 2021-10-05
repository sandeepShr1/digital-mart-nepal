import React from 'react';
import loading from '../img/ajax-loader.gif';

const Spinner = () => {
    return (
        <div className="container text-center">
            <img src={loading} alt="loading" className="img-fluid" />
        </div>
    )
}

export default Spinner;

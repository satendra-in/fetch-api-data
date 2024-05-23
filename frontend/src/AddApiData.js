import React, { useState } from 'react';
import axios from 'axios';

const AddApiData = ({ addUrlHandler }) => {
    const [url, setUrl] = useState('');

    const add = async (e) => {
        e.preventDefault();
        if (url === '') {
            alert('Enter URL');
            return;
        }
        addUrlHandler(url);
        setUrl('');
    };

    return (
        <div className="ui main">
            <h3>Add API Data</h3>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>URL</label>
                    <input
                        type="text"
                        name="url"
                        placeholder="enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <button className="ui button blue">Fetch Data</button>
            </form>
        </div>
    );
};

export default AddApiData;

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import AddApiData from './AddApiData';
import ApiDataList from './ApiDataList';

function App() {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/data');
            setApiData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addUrlHandler = async (url) => {
        try {
            await axios.post('http://localhost:5000/api/data', { url });
            fetchData();
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className='ui container'>
            <Header />
            <AddApiData addUrlHandler={addUrlHandler} />
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            <ApiDataList dataList={apiData} fetchData={fetchData} />
        </div>
    );
}

export default App;

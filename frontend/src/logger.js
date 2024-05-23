import axios from 'axios';

const PROXY_URL = 'http://localhost:3006/log';

const logToSplunk = async (message, level = 'info') => {
    // const event = {
    //     event: {
    //         message,
    //         level,
    //     },
    //     sourcetype: '_json',
    // };

    try {
        console.log('Sending log to proxy server:', event);
        // const response = await axios.post(PROXY_URL, event, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        const response = await axios.post('http://localhost:5000/api/data', { message, level });

        console.log('Log sent via proxy server:', response.data);
    } catch (error) {
        console.error('Error sending log via proxy server:', error);
        if (error.response) {
            console.error('Response error data:', error.response.data);
        }
    }
};

export default logToSplunk;

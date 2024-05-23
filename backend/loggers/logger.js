const axios = require('axios');
const { SPLUNK_HEC_URL, SPLUNK_HEC_TOKEN, SPLUNK_INDEX } = require('../config');


const logToSplunk = async (message, level = 'info') => {
    const event = {
        event: {
            message,
            level,
            index: SPLUNK_INDEX, 
        },
        sourcetype: '_json',
    };

    try {
        console.log('Sending log:', event);
        //await axios.post(url, event, { headers: { 'Content-Type': 'application/json' } });
        //const response = 
        await axios.post(SPLUNK_HEC_URL, event, {
            headers: {
                'Authorization': `Splunk ${SPLUNK_HEC_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending log:', error);
    }
};

module.exports = logToSplunk;

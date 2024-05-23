const express = require('express');
const axios = require('axios');
const ApiData = require('../models/ApiData');
const logToSplunk = require('../loggers/logger');
const { logURL } = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {
    const { url } = req.body;

    try {
        logToSplunk(`Fetching data from: ${url}`);
        console.log("fetch url");
        const response = await axios.get(url);
        console.log("fetched");
        const { login, created_at, updated_at } = response.data;
        console.log("created json from response");
        //checking id data is already available
        const dataEntry = await ApiData.findOneAndUpdate(
            {
                login,
            },
            {
                created_at,
                updated_at
            }
        );
        
        if(dataEntry){
            console.log('data already in db: ' + JSON.stringify({...dataEntry, updated_at}));
            logToSplunk('Data updated to MongoDB: ' + JSON.stringify({ login, created_at, updated_at }));
            res.json({ login, created_at, updated_at });
        }
        else{ 
            const apiData = new ApiData({ login, created_at, updated_at });
            await apiData.save();
            logToSplunk('Data saved to MongoDB: ' + JSON.stringify(apiData));
            res.json(apiData);
        }
        
        
    } catch (error) {
        logToSplunk('Error fetching data from API', 'error');
        res.status(500).send('Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const apiData = await ApiData.find();
        res.json(apiData);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        //console.log('data to be deleted: ' + req.params);
        const deletedData = await ApiData.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).json({ msg: 'Data not found' });
        }
        logToSplunk('Data deleted from MongoDB: ' + JSON.stringify(req.params));
        res.json({ msg: 'Data deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        const { comment } = req.body;
        const apiData = await ApiData.findById(req.params.id);
        if (!apiData) {
            return res.status(404).json({ msg: 'Data not found' });
        }
        apiData.comments.push(comment);
        await apiData.save();
        logToSplunk('Comment posted to MongoDB', logURL);
        res.json({ comment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

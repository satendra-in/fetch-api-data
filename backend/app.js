const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiDataRoutes = require('./routes/apiData');
//const reactLoggerRoutes = require('./reactLogger')
const { mongoURI } = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/data', apiDataRoutes);
//app.use('/react/logger', reactLoggerRoutes);
app.post('/reactLogger', async (req, res) => {
    const { logMessage, level } = req.body;
    logToSplunk(`React Log: ${logMessage}`, level);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

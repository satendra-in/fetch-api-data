const mongoose = require('mongoose');

const ApiDataSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    comments: [String],
    created_at: Date,
    updated_at: Date
}, {timestamps: true});
const apiDataModel = mongoose.model('ApiData', ApiDataSchema);

module.exports = apiDataModel;

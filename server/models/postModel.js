const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    hackathonName: {
        type: String,
        trim: true,
        required: [true, "Hackathon name is required"]
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "userId is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"]
    },
    domain: {
        type: [String],
        required: [true, "Domain is required"],
        default: []
    },
    requirement: {
        type: [String],
        default: []
    },
    joinees: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'UserModel',
        default: []
    },
    status: {
        type: String,
        trim: true,
        default: "Open",
        enum: ["Open", "Live", "Ended"]
    },
    mode: {
        type: String,
        trim: true,
        enum: ["Online", "Offline"],
        required: [true, "Mode is required"]
    }
}, { timestamps: true });

module.exports = mongoose.model('PostModel', postSchema);
const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        postedBy: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        postedAt: {
            type: Date,
            default: Date.now
        },

        lastUpdatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;

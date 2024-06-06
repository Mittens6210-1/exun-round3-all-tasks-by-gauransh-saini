const express = require('express');
const Article = require('./articleSchema');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

// RENDER ALL ARTICLES

router.get('/article/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' });
        res.render('article', { articles: articles });
    } catch (error) {
        res.status(500).send(error);
    }
});

// CREATE

router.get('/article/create', (req, res) => {
    res.render('createArticlePage', { article: new Article() });
});

router.post('/article/create', async (req, res) => {
    let article = new Article({
        name: req.body.name,
        postedBy: req.body.postedBy,
        content: req.body.content
    });
    try {
        article = await article.save();
        res.redirect(`/article/${article.id}`);

    } catch(error) {
        res.render('createArticlePage', { article: article });
        console.log(error);
    }
});

// GET FROM ID

router.get('/article/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect ('/');
    res.render('articleContent', {article: article} );
});

// DELETE

router.get('/article/:id/delete', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/article');
});

router.delete('/article/:id/delete', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/article');
});

router.get('/article/:id/update', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect('/');
    res.render('updateArticlePage', { article: article });
});

router.put('/article/:id/update', async (req, res) => {
    let article = await Article.findById(req.params.id);
    
    if (!article) {
        return res.redirect('/article');
    }
    article.name = req.body.name;
    article.postedBy = req.body.postedBy;
    article.content = req.body.content;
    article.lastUpdatedAt = new Date();

    try {
        article = await article.save();
        res.redirect(`/article/${article.id}`);
    } catch (error) {
        res.render('updateArticlePage', { article: article });
        console.log(error);
    }
});

module.exports = router;
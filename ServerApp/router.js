const express = require('express');
const routerIT = require('./routers/ITrouter');
const routerEN = require('./routers/ENrouter');
var cors = require('cors')
const { SearchWords, IncreaseCounterWord } = require('./controllerdb');

const router = express.Router();

router.use('/IT', routerIT);
router.use('/EN', routerEN);

router.patch('/patch', async (req, res) => {
    const result = await IncreaseCounterWord(req.query.word.toUpperCase());
    res.json({
        status: (result > 0)
    })
});

router.get('/search', async (req, res) => {
    const [result,] = await SearchWords(req.query.word.toUpperCase());
    let resWordArray = [];
    let resLangArray = [];
    result.forEach((res) => {
        resWordArray.push(res.resWord);
        resLangArray.push(res.resLang);
    });
    console.log([resWordArray, resLangArray]);
    res.json([[resWordArray, resLangArray]]);
});

module.exports = router;
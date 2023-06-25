const { response } = require('express');
const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
    req.header('AccountKey', 'FbQwubspQs+LjagFP5qsUA==');
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.get('/servicealerts', (req, res) => {
    request({
        url: 'http://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts',
    },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                console.log(response.statusCode)
                console.log(req.headers)
                return res.status(response.statusCode).json({ type : 'error', message : req.body });
            }

            res.json(JSON.parse(body));
        }
    )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
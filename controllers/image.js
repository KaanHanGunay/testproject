const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '97b25d33de6d4c9889fdd0216b924b1c'
   });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('API Error'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('Hata oluştu!');
        });
}

module.exports = {
    handleImage,
    handleApiCall
}
const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id: id })
        .then(user => {
            if(user.lenght > 0){
                res.json(user[0]);
            } else {
                res.status(404).json('Kullanıcı bulunamadı');
            }
        })
        .catch(err => {
            res.status(400).json('Connection error');
        });
}

module.exports = {
    handleProfileGet: handleProfileGet
}
const router = require('express').Router();
const mock = require('./mockBig');

router.get('/clients', function (req, res) {
    const clients = mock.clientsBig;
    res.send(clients);
});

module.exports = router;

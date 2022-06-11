const express = require('express');
const app = express();
const path = require('path');
const history = require('connect-history-api-fallback')
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 3001

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/meseros',require('./routes/meseros'));
app.use('/comidaxbebida',require('./routes/comidaxbebida'));
app.use('/mesa',require('./routes/mesa'));
app.use('/orden',require('./routes/orden'));
app.use('/ordenespec',require('./routes/ordenespec'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(history());

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Funcionando...'
    })
})

app.listen(PORT, () => {
    console.log('Server arriba');
});
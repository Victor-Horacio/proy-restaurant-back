import express from 'express';

const router = express.Router();

import connection from '../connection';

router.get('/obtener-ordenspec', async (req, res) =>{

    try{
        const query = 'SELECT * FROM OrdenESPEC';
        const ordenspec = await connection.query(query);
        res.json(ordenspec);


    } catch(error){
        return res.json({error}); 
    }

});

router.post('/agregar-orden_comida', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `INSERT INTO Orden( ORD_Mesa, ORD_Fecha ) VALUES ('${body.ORD_Mesa}', NOW())`;
        await connection.query(query);
        res.json('ok');

    } catch (error) {
        return res.json({error});
    }

    
});

router.post('/agregar_orden_spec', async (req, res) => {
    try {
        const body = req.body;
        console.log(body)
        const query = `INSERT INTO OrdenESPEC( ORDs_id, ORDs_Detalles ) VALUES (${body.ORD_id.ORD_id2}, ${body.CXM_ID.CXM_ID2} )`;
        await connection.query(query);

        res.json('ok');
        
    } catch (error) {
        return res.json({error});
        
    }
       
    
});
    
module.exports = router;
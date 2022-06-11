import express from 'express';

const router = express.Router();

import connection from '../connection';

router.get('/obtener-meseros', async (req, res) =>{

    try{
        const query = 'SELECT * FROM Meseros';
        const meseros = await connection.query(query);
        res.json(meseros);

    } catch(error){
        return res.json({error}); 
    }

});

router.post('/eliminar-meseros', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `DELETE FROM Meseros where MES_id = ${body.MES_id}`;
        await connection.query(query);
        res.json('ok');

    } catch (error) {
        return res.json({error});
    }
 });


router.post('/agregar-meseros', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `INSERT INTO Meseros(MES_Nombre, MES_ApePat, MES_ApeMat) VALUES ('${body.MES_Nombre}', '${body.MES_ApePat}', '${body.MES_ApeMat}')`;
        await connection.query(query);
        res.json('ok');

    } catch (error) {
        return res.json({error});
    }

    
});

router.post('/modificar_meseros', async (req, res) => {
try {
    const body = req.body;
    const query = `UPDATE Meseros SET MES_Nombre = '${body.MES_Nombre}', MES_ApeMat = '${body.MES_ApeMat}', MES_ApePat = '${body.MES_ApePat}'  WHERE MES_id = ${body.MES_id.MES_ID2}`;
    await connection.query(query);
    res.json('ok');
    
} catch (error) {
    return res.json({error});
}
   

});


router.get('/obtener_meseros_fecha', async (req, res) => {
    try {
        const body = req.body;
        const query = `
        SELECT Orden.*, Meseros.MES_Nombre, Meseros.MES_ApePat, Meseros.MES_ApeMat FROM Orden
        INNER JOIN Meseros
        INNER JOIN Mesa
        ON Mesa.MESA_id = Orden.ORD_Mesa WHERE Meseros.MES_id = Mesa.MESA_Mesero
        `;
        const data = await connection.query(query);
        res.json(data);
        
    }
    catch (error) {
        return res.json({error});
    }
       
    
});

module.exports = router;

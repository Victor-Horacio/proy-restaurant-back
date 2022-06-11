const express = require('express')

const router = require('express').Router()

const connection = require('../connection');
//import connection from '../connection';

router.get('/obtener-orden', async (req, res) =>{

    try{
        const query = 'SELECT * FROM Orden';
        const orden = await connection.query(query);
        res.json(orden);


    } catch(error){
        return res.json({error}); 
    }

});


router.post('/agregar-orden', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `INSERT INTO Orden( ORD_Mesa, ORD_Fecha ) VALUES ('${body.ORD_Mesa}', NOW())`;
        await connection.query(query);
        res.json('ok');

    } catch (error) {
        return res.json({error});
    }

    
});



router.post('/eliminar-orden', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `DELETE FROM Orden where ORD_id = ${body.ORD_id}`;
        await connection.query(query);
        res.json('ok');

    } catch (error) {
        return res.json({error});
    }
 });


/*
 SELECT comidaxBebidas.CXM_Nombre, comidaxBebidas.CXM_Precio FROM comidaxBebidas 
INNER JOIN orden INNER JOIN ordenespec 
ON orden.ORD_id = ordenespec.ORDs_id AND comidaxbebidas.CXM_id=ordenespec.ORDs_Detalles 
where orden.ORD_id = '3';*/

router.post('/obtener-comidas-de-orden', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `SELECT ComidaxBebidas.CXM_Nombre, ComidaxBebidas.CXM_Precio FROM ComidaxBebidas 
        INNER JOIN Orden INNER JOIN OrdenESPEC
        ON Orden.ORD_id = OrdenESPEC.ORDs_id AND ComidaxBebidas.CXM_id=OrdenESPEC.ORDs_Detalles 
        where Orden.ORD_id = '${body.ORD_id}'`;
        const data = await connection.query(query);
        res.json(data);

    } catch (error) {
        return res.json({error});
    }
 });

router.post('/obtener-total-orden', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `SELECT SUM(ComidaxBebidas.CXM_Precio) AS total FROM ComidaxBebidas
        INNER JOIN Orden INNER JOIN OrdenESPEC ON Orden.ORD_id = OrdenESPEC.ORDs_id AND ComidaxBebidas.CXM_id=OrdenESPEC.ORDs_Detalles
        where Orden.ORD_id = ${body.ORD_id};`;
        const data = await connection.query(query);
        res.json(data);

    } catch (error) {
        return res.json({error});
    }
 });

 router.post('/guardar-total-en-db', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `UPDATE Orden SET ORD_CostoTotal = ${body.total} WHERE ORD_id = ${body.ORD_ID1};`;
        await connection.query(query);
        res.json('ok');

    } catch (error) {
        return res.json({error});
    }
 });


 
 router.post('/obtener-ventas-dia', async (req, res) =>{
    try {
        const body = req.body;
        const query =  `SELECT SUM(ORD_CostoTotal) AS total FROM Orden WHERE ORD_Fecha LIKE '${body.fechaObj} %'; `;
        const data = await connection.query(query);
        res.json(data);

    } catch (error) {
        return res.json({error});
    }
 });
 

module.exports = router;
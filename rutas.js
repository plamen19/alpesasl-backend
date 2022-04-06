module.exports = function( app ){

// JSON PARA LAS MAQUINAS AGREGADAS A LA BASE DE DATOS
app.get('/maquinas', (req, res) => {

       (new sql.Request()).query('SELECT * FROM dbo.tblMaquinas', function (err, maquinas) {

              if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

              return res.json( maquinas.recordset );
       });

});
// ----------------------------------------------

// JSON PARA LOS ESTADOS DE LAS MÁQUINAS 
app.get('/maquinas/estados', (req, res) => {

       (new sql.Request()).query('SELECT * FROM dbo.EstadosMaquina', function (err, maquinas) {

              if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

              return res.json( maquinas.recordset );
       });

});
// ----------------------------------------------

// JSON PARA LAS MAQUINAS AGREGADAS A LA BASE DE DATOS
app.get('/operaciones', (req, res) => {

       (new sql.Request()).query('SELECT TOP 10 * FROM dbo.tblOperaciones', function (err, operaciones) {

              if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

              return res.json( operaciones.recordset );
       });

});
// ----------------------------------------------

}
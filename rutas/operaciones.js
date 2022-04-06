module.exports = function(app, sql){

	/* 
	
		TABLA: dbo.tblOperaciones
		CONSULTA: Las últimas 10 operaciones insertadas en el sistema.
	
	*/
	app.get('/operaciones', (req, res) => {

		(new sql.Request()).query('SELECT TOP 10 * FROM dbo.tblOperaciones', function (err, operaciones) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( operaciones.recordset );
		});

	});
	// ----------------------------------------------
   
}
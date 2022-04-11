module.exports = function(app, sql){

	/* 
	
		TABLA: dbo.tblOperarios
		CONSULTA: Devuelve todos los operarios de la base de datos.
	
	*/
	app.get('/operarios', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblOperarios', function (err, operarios) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( operarios.recordset );
		});

	});
	// ----------------------------------------------

	/* 
	
		TABLA: dbo.tblGruposOperarios
		CONSULTA: Devuelve todos los grupos de operarios de la base de datos.
	
	*/
	app.get('/operarios/grupos', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblGruposOperarios', function (err, operarios) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( operarios.recordset );
		});

	});
	// ----------------------------------------------
   
}
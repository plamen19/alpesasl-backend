module.exports = function(app, sql){

	/* 
	
		TABLA: dbo.tblBoletines
		CONSULTA: Devuelve los 50 últimos boletines insertados en la base de datos.
	
	*/
	app.get('/boletines', (req, res) => {

		(new sql.Request()).query('SELECT TOP 50 * FROM dbo.tblBoletines ORDER BY InicioBoletin DESC', function (err, boletines) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( boletines.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		TABLA: dbo.tblBoletines
		CONSULTA: Devuelve el último boletín iniciado registrado en la base de datos.
	
	*/
	app.get('/boletines/ultimoIniciado', (req, res) => {

		(new sql.Request()).query('SELECT TOP 1 * FROM dbo.tblBoletines ORDER BY InicioBoletin DESC', function (err, boletines) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( boletines.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		TABLA: dbo.tblBoletines
		CONSULTA: Devuelve el último boletín finalizado registrado en la base de datos.
	
	*/
	app.get('/boletines/ultimoFinalizado', (req, res) => {

		(new sql.Request()).query('SELECT TOP 1 * FROM dbo.tblBoletines ORDER BY FinalBoletin DESC', function (err, boletines) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( boletines.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------	
   
}
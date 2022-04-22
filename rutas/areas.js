module.exports = function( app, sql ){

	/* 
	
		TABLA: dbo.tblAreas
		CONSULTA: Devuelve todas las áreas cradas en la base de datos.
	
	*/
	app.get('/areas', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblAreas', function (err, areas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( areas.recordset );
		});

	});
	// ----------------------------------------------

}
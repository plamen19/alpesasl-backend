module.exports = function( app, sql ){

	/* 
	
		TABLA: dbo.tblEmbalajes
		CONSULTA: Devuelve todos los embalajes creados en la base de datos.
	
	*/
	app.get('/embalajes', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblEmbalajes', function (err, embalajes) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( embalajes.recordset );
		});

	});
	// ----------------------------------------------

	/* 
	
		TABLA: dbo.tblFamiliasEmbalaje
		CONSULTA: Devuelve todas las familias de embalaje creadas en la base de datos.
	
	*/
	app.get('/embalajes/familias', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblEmbalajes', function (err, embalajes) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( embalajes.recordset );
		});

	});
	// ----------------------------------------------	

	/* 
	
		TABLA: dbo.dblSubFamiliasEmbalaje
		CONSULTA: Devuelve todas las subfamilias de embalaje creadas en la base de datos.
	
	*/
	app.get('/embalajes/subfamilias', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblSubFamiliasEmbalaje', function (err, embalajes) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( embalajes.recordset );
		});

	});
	// ----------------------------------------------		

}
module.exports = function( app, sql ){

	/* 
	
		TABLA: dbo.tblfamiliasIntervencion
		CONSULTA: Devuelve todas las famílias de intervención creadas.
	
	*/
	app.get('/intervenciones/tipos', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblfamiliasIntervencion', function (err, intervenciones) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( intervenciones.recordset );
		});

	});
	// ----------------------------------------------

	/* 
	
		TABLA: dbo.tblMotivosIntervencion
		CONSULTA: Devuelve todos los motivos de intervención creadas.
	
	*/
	app.get('/intervenciones/motivos', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblMotivosIntervencion', function (err, intervenciones) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( intervenciones.recordset );
		});

	});
	// ----------------------------------------------

	/* 
	
		TABLA: dbo.tblActividades
		CONSULTA: Devuelve todas las actividades que hay creadas.
	
	*/
	app.get('/intervenciones/actividades', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblActividades', function (err, intervenciones) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( intervenciones.recordset );
		});

	});
	// ----------------------------------------------		

}
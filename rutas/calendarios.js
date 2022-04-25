module.exports = function(app, sql){

	/* 
	
		TABLA: dbo.tblTurnosCalendario
		CONSULTA: Todos los turnos generados para el año actual.
	
	*/
	app.get('/calendario', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblTurnosCalendario WHERE YEAR(FechaTurno) = YEAR(GETDATE())', function (err, calendarios) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( calendarios.recordset );
		});

	});
	// ----------------------------------------------
   
}
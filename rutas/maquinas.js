module.exports = function(app, sql){

	/* 
	
		TABLA: dbo.tblMaquinas
		CONSULTA: Devuelve todas las máquinas insertadas en la base de datos.
	
	*/
	app.get('/maquinas', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblMaquinas', function (err, maquinas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( maquinas.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		TABLA: dbo.tblTiposMaquina
		CONSULTA: Devuelve todos los tipos de máquina insertados en la base de datos.
	
	*/
	app.get('/maquinas/tipos', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblTiposMaquina', function (err, maquinas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( maquinas.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------


	/* 
	
		TABLA: dbo.EstadosMaquina
		CONSULTA: Devuelve los estados de las máquinas que hay registrados en la base de datos.
	
	*/
	app.get('/maquinas/estados', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.EstadosMaquina', function (err, maquinas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( maquinas.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		TABLA: dbo.tblMaquinas
		PARÁMETROS: id
		CONSULTA: Devuelve los datos de una máquina en específico.
	
	*/
	app.get('/maquina/:id', (req, res) => {

		(new sql.Request()).query('SELECT * FROM dbo.tblMaquinas WHERE idMaquina = ' + req.params.id, function (err, maquinas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( maquinas.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		TABLA: dbo.tblProceso
		PARÁMETROS: id
		CONSULTA: Devuelve los datos de una máquina en específico.
	
	*/
	app.get('/maquina/:id/boletin', (req, res) => {

		(new sql.Request()).query('SELECT TOP(1) * FROM dbo.tblProceso WHERE idMaquina = ' + req.params.id + ' ORDER BY Fecha DESC', function (err, maquinas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( maquinas.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		TABLA: dbo.tblVelocidades
		PARÁMETROS: id
		CONSULTA: Devuelve los datos de velocidades de una máquina en específico.
	
	*/
	app.get('/maquina/:id/velocidades', (req, res) => {

		(new sql.Request()).query('SELECT TOP 1 * FROM dbo.tblVelocidades WHERE idMaquina = ' + req.params.id + ' ORDER BY idVelocidad DESC', function (err, maquinas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( maquinas.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		TABLA: dbo.tblProceso
		PARÁMETROS: id
		CONSULTA: Devuelve la velocidad con un retraso de minuto, minuto y medio de una máquina en específico.
	
	*/
	app.get('/maquina/:id/velocidad', (req, res) => {

		(new sql.Request()).query('SELECT TOP 1 * FROM dbo.tblProceso WHERE idMaquina = ' + req.params.id + ' ORDER BY Fecha DESC', function (err, maquinas) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( maquinas.recordset );
		});

	});
	// --------------------------------------------------------------------------------------------

	/* 
	
		PROCEDIMIENTOS: procTerminal_EquiposProduccionVerActivo, procTerminal_OperariosProduccionVer
		PARÁMETROS: id
		CONSULTA: Devuelve un array con los operarios que están en una máquina específica
	
	*/
	app.get('/maquina/:id/operarios', (req, res) => {

		try{

			let getOperarios = async ()=>{

				let c_almacenada = new sql.Request();

				let idequipo = await c_almacenada.input( "idMaquina", 5 ).execute( "procTerminal_EquiposProduccionVerActivo" );	
				let idequipoprod = idequipo.recordset[0].idEquipoProduccion[0];
		
				let operarios = await c_almacenada.input("idEquipoProduccion", idequipoprod).execute( "procTerminal_OperariosProduccionVer" );
				
				return res.json( operarios );
			}

			getOperarios();
	
		}catch( err ){

			console.log(err);
			return res.json( { error: err } );

		}

	});
	// --------------------------------------------------------------------------------------------

   
}
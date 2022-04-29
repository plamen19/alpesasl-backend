module.exports = function(app, sql){

	/* 
	
		TABLA: dbo.tblOperaciones
		CONSULTA: Las últimas 10 operaciones insertadas en el sistema.
	
	*/
	app.get('/operaciones', (req, res) => {

		(new sql.Request()).query('SELECT TOP 50 * FROM dbo.tblOperaciones ORDER BY idOperacion DESC', function (err, operaciones) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( operaciones.recordset );
		});

	});
	// ----------------------------------------------
	
	/* 
	
		TABLA: dbo.tblOperaciones
		CONSULTA: Las últimas 10 operaciones insertadas en el sistema.
	
	*/
	app.get('/operacion/:id', (req, res) => {

		(new sql.Request()).query('SELECT TOP 1 * FROM dbo.tblOperaciones WHERE idOperacion = ' + req.params.id, function (err, operaciones) {

			if (err) return res.json( { err: 'No se han podido obtener los registros.' } );

			return res.json( operaciones.recordset );
		});

	});
	// ----------------------------------------------

	/* 
	
		PROCEDIMIENTO: procTerminal_ComentariosVerPorOrden
		PARÁMETROS: codOperacion
		CONSULTA: Array con los comentarios enviados a esa orden.
	
	*/
	app.get('/operacion/:id/comentarios', (req, res) => {

		try{

			let getComentariosOrden = async ()=>{

				let c_almacenada = new sql.Request();

				let comentarios = await c_almacenada
					.input( "codOrden", req.params.id )
					.execute( "procTerminal_ComentariosVerPorOrden" );	
				
				return res.json( comentarios.recordset );
			}

			getComentariosOrden();
	
		}catch( err ){

			console.log(err);
			return res.json( { error: err } );

		}

	});
	// ----------------------------------------------	

	/* 
	
		PROCEDIMIENTO: procTerminal_InfoAdicionalVer
		PARÁMETROS: idOperacion
		CONSULTA: Array con la información adicional de la operación.
	
	*/
	app.get('/operacion/:id/info', (req, res) => {

		try{

			let getInformacionAdicional = async ()=>{

				let c_almacenada = new sql.Request();

				let info_adicional = await c_almacenada
					.input( "idOperacion", req.params.id )
					.execute( "procTerminal_InfoAdicionalVer" );	
				
				return res.json( info_adicional.recordset );
			}

			getInformacionAdicional();
	
		}catch( err ){

			console.log(err);
			return res.json( { error: err } );

		}

	});
	// ----------------------------------------------		
   
}
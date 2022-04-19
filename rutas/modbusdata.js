module.exports = function( app, ModbusRTU ){

	let lista_maquinas = {

		'PerfiladoraP2': '192.168.30.18',
		'PerfiladoraP1': '192.168.30.17',
		'Mandriladora12B': '192.168.30.21',
		'Mandriladora24B': '192.168.30.23',
		'Mandriladora10M': '192.168.30.24',

	}

	/* 
	
		FUNCION: Devuelve un array con los valores obtenidos del PLC en tiempo real. (retraso mínimo de 500ms para no saturar la red)
	
	*/
	app.get('/modbus/:maquina', (req, res) => {

		let ip_plc = lista_maquinas[req.params.maquina]

		if( ip_plc ){

			// Abrimos una conexión a través de TCP con el PLC

			try{

				let client = new ModbusRTU();

				client.connectTCP(ip_plc, { port: 502 }, ()=>{

					client.setID(1);

					client.readHoldingRegisters(1300, 44, function(err, data) {
						
						/*
						
							VALORES INVESTIGADOS
							POSICIONES EN ARRAY:
				
							1, 2, 3, 4, 5, 6 = LA FECHA ACTUAL, D/M/Y/H/M/S
							7 = EL ESTADO DE LA MÁQUINA
							8 = LA VELOCIDAD DE LA MÁQUINA (PULSOS)
				
						
						*/

						if ( err ) { return res.json( { err: 'No se han podido cargar los datos.', detalles: err } ) }
											
						client.close();
	
						client = null; /* Borramos el objeto del cliente para liberar memoria. */

						return res.json( data.data )
						
	
					});
					
				});

			}catch( error ){

				console.log( "No se ha podido conectar por TCP." );
				
			}
			
		}else{
			return res.status(200).json( { err: 'Esta máquina no tiene PLC integrado.' } );
		}

	});
	// ----------------------------------------------

}
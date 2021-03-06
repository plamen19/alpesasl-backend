module.exports = function( app, logger ){

	let Net = require('net');
	let parseString = require('xml2js').parseString;
	let cliente = Net.Socket();

	function formatDate(date, format) {
		const map = {
		    mm: date.getMonth() + 1,
		    dd: date.getDate(),
		    yy: date.getFullYear().toString().slice(-2),
		    yyyy: date.getFullYear(),
		}
	   
		return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
	}

	function getFechaHora(){

		let fecha = formatDate(new Date(), 'mm/dd/yy');
		let hora = (new Date()).toLocaleTimeString('es-ES');

		return fecha + "-" + hora;

	}

	/* 
		PARAMETRO: Código de la máquina (12B, P2...)
		RETORNA: El texto de la trama codificado para el servidor de SPIN.
	*/
	function getTrama( maquina ){

		return '<DETALLEMAQUINA MAQUINA="' + maquina + '"><ESTADO/>';

	}

	function conectarSPIN(){

		try{

			cliente.connect(100, '192.168.1.18', function( err ) {
					
				if( err ){ logger.error( "[SPIN API]["+ getFechaHora() +"] Error al conectarse al servidor de SPIN." ); return; }
		
				logger.info( "[SPIN API]["+ getFechaHora() +"] Conectado satisfactoriamente, a la escucha de tramas." );
				console.log( "[SPIN API]["+ getFechaHora() +"] Conectado al servidor SPIN. A la escucha de tramas..." );
	
			});

		}catch( err ){

			logger.error( "[SPIN API][" + getFechaHora() + "] No se ha podido conectar con el servidor de SPIN. Reintentando en dos segundos..." );
			setTimeout( function(){ conectarSPIN(); }, 2000 )
			
		}

	}

	app.get('/spincliente/:maquina/datos', async (req, res, next) => {

		let ip = req.socket.remoteAddress;

		cliente.write( getTrama( req.params.maquina ), function(err){
			
			if( err ){ logger.error( "[SPIN API]["+ getFechaHora() +"]["+ip+"] Error al enviar la trama al servidor." ); return; }

			cliente.once( "data", function(data){

				logger.info( "[SPIN API]["+ getFechaHora() +"]["+ip+"] Enviado datos de la máquina " + req.params.maquina );
				res.status(200).json( { datos: data + "" } );

			} );

		} );

	});

	conectarSPIN();

	cliente.on('close', () => {

		console.log("[SPIN API] La API ha sido expulsada de la sesión. Reintentando conexión con SPIN en dos segundos...");
		logger.error( "[SPIN API][" + getFechaHora() + "] Cliente expulsado de la sesión. Realizando reintento..." );
		setTimeout( function(){ conectarSPIN(); }, 2000 )
		cliente.destroy();
		
	});	

}
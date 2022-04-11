module.exports = function( app){

	let Net = require('net');

	/* 
		PARAMETRO: Código de la máquina (12B, P2...)
		RETORNA: El texto de la trama codificado para el servidor de SPIN.
	*/
	function getTrama( maquina ){

		return '<DETALLEMAQUINA MAQUINA="' + maquina + '"><ESTADO/>';

	}

	function formatDate(date, format) {
		const map = {
		    mm: date.getMonth() + 1,
		    dd: date.getDate(),
		    yy: date.getFullYear().toString().slice(-2),
		    yyyy: date.getFullYear(),
		}
	   
		return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
	   }

	app.get('/spincliente/:maquina/datos', async (req, res) => {

		let fecha = formatDate(new Date(), 'mm/dd/yy');
		let hora = (new Date()).toLocaleTimeString();
		let ip = req.socket.remoteAddress 
		let cliente = Net.Socket();

		cliente.connect(100, '192.168.1.18', function( err ) {
					
			cliente.write( getTrama(req.params.maquina), (err) => {
		
				if( err ){

					console.log( "[SPIN API] ["+ fecha +"] ["+ ip +"] No se han podido obtener los datos de la maquina " + req.params.maquina );
					return { err: 'No se han podido obtener los datos desde el servidor.' }

				}
		
			} );

			cliente.on('data', function(data) {
			
				console.log( "[SPIN API] ["+ fecha +" | "+ hora +"] ["+ ip +"] Enviados datos de la máquina " + req.params.maquina );
	
				cliente.destroy();
	
				return res.json( { datos: data + "" } );
	
			});

		});

	});

}
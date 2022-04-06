// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

// Abrimos una conexión a través de TCP con el PLC
client.connectTCP("192.168.30.21", { port: 502 });
client.setID(4);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function () {

	client.readHoldingRegisters(1300, 50, function(err, data) {

		/*

			VALORES INVESTIGADOS
			POSICIONES EN ARRAY:

			1, 2, 3, 4, 5, 6 = LA FECHA ACTUAL, D/M/Y/H/M/S
			7 = EL ESTADO DE LA MÁQUINA
			8 = LA VELOCIDAD DE LA MÁQUINA

		*/

		if( err ){

			console.log( "[ERROR] No se han podido obtener los datos del PLC. Error detallado: " );
			console.log(err);
			return;

		}

		console.log( data.data );

	});

}, 1000);

/* var net = require('net');

let trama = '<DETALLEMAQUINA MAQUINA="24B"><ESTADO/>';

var client = new net.Socket();
client.connect(100, '192.168.1.18', function() {

	console.log('Conectado al servidor SPIN.');

	setInterval( ()=>{

		client.write( trama, (err) => {

			console.log(err);
	
		} );

	}, 1000 )

});

client.on('data', function(data) {
	console.log('Received: ' + data);
});  */
// // create an empty modbus client
// var ModbusRTU = require("modbus-serial");
// var client = new ModbusRTU();

// // Abrimos una conexión a través de TCP con el PLC
// client.connectTCP("192.168.30.17", { port: 502 });
// client.setID(2);

// // read the values of 10 registers starting at address 0
// // on device number 1. and log the values to the console.
// setInterval(function () {

// 	client.readHoldingRegisters(1300, 50, function(err, data) {

// 		/*

// 			VALORES INVESTIGADOS
// 			POSICIONES EN ARRAY:

// 			1, 2, 3, 4, 5, 6 = LA FECHA ACTUAL, D/M/Y/H/M/S
// 			7 = EL ESTADO DE LA MÁQUINA

// 		*/

// 		if( err ){

// 			console.log( "[ERROR] No se han podido obtener los datos del PLC. Error detallado: " );
// 			console.log(err);
// 			return;

// 		}

// 		console.log( data.data );

// 	});

// }, 1000);

/* var net = require('net');

let trama = '<DETALLEMAQUINA MAQUINA="P2"/><ESTADO/>';

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
}); */

// const sql = require('mssql');

// const sqlConfig = {
       
// 	user: "Administrador",							/* Usuario del SQLServer */
       
// 	password: "Alpes@2011",							/* Contraseña del SQLServer */
       
// 	domain: "ALPESASL",								/* Dominio en el que se encuentra el SQLServer */
       
// 	database: "ScAlpesa07",							/* Base de datos a la cual queremos acceder */

//        server: 'sqlserver',								/* Nombre en el dominio del servidor al que queremos acceder */
//        pool: {
//               max: 10,
//               min: 0,
//               idleTimeoutMillis: 15000
//        },
//        options: {
//               cryptoCredentialsDetails: {
//                      minVersion: 'TLSv1' 						/* [IMPORTANTE] Si no se define esta configuración, no dejará loguear. */
//               },
//               trustServerCertificate: true
//        }
// }

// sql.connect(sqlConfig, async function (err) {

//        if (err) console.log(err);

//        console.log("Conexión exitosa a la base de datos SQL Server.");

// 	try{

// 		let c_almacenada = new sql.Request();

// 		let idequipo = await c_almacenada.input( "idMaquina", 5 ).execute( "procTerminal_EquiposProduccionVerActivo" );	
// 		let idequipoprod = idequipo.recordset[0].idEquipoProduccion[0];

// 		let operarios = await c_almacenada.input("idEquipoProduccion", idequipoprod).execute( "procTerminal_OperariosProduccionVer" );	

// 		console.log(operarios.recordset);

// 	}catch( err ){

// 		console.log( "Error con la consulta almacenada: " + err );

// 	}
// });

/* const fins = require('omron-fins');
const options = {timeout: 5000, SA1: 2, DA1: 1, protocol: "tcp"}; //protocol can be "udp" or "tcp" only
const client = fins.FinsClient(9600, '192.168.30.20', options);

client.connect();

client.on('reply',msg=>{
	console.log('SID: ', msg.sid);
	console.log('Command Code: ', msg.command);
	console.log('Response Code: ', msg.response);
	console.log('Remote Host: ', msg.remotehost);
});
 */
/* client.read('DM1300',7,function(err, msg) {
	console.log(err);
	console.log("msg: ", msg);
});	*/
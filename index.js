const express = require('express');
const cors = require('cors');
const winston = require('winston');
const ModbusRTU = require("modbus-serial");
const sql = require('mssql');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

require('events').EventEmitter.defaultMaxListeners = 100;

/* 

	--------------------------------
	CONFIGURACIÓN DEL LOGGER WINSTON
	--------------------------------

*/

const spinLogger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.File({ filename: './logs/spin/spin-error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/spin/spin-info.log', level: 'info' }),
		new winston.transports.File({ filename: './logs/spin/spin.log' }),
	],
});

/* 

	-------------------------------------------
	CONFIGURACIÓN PARA LOGUEAR EN EL SQL SERVER
	-------------------------------------------

*/

const sqlConfig = {
       
	user: "Administrador",							/* Usuario del SQLServer */
       
	password: "Alpes@2011",							/* Contraseña del SQLServer */
       
	domain: "ALPESASL",								/* Dominio en el que se encuentra el SQLServer */
       
	database: "ScAlpesa07",							/* Base de datos a la cual queremos acceder */

       server: 'sqlserver',								/* Nombre en el dominio del servidor al que queremos acceder */
       pool: {
              max: 10,
              min: 0,
              idleTimeoutMillis: 15000
       },
       options: {
              cryptoCredentialsDetails: {
                     minVersion: 'TLSv1' 						/* [IMPORTANTE] Si no se define esta configuración, no dejará loguear. */
              },
              trustServerCertificate: true
       }
}

/* 

	-----------------------------------------------------------
	CONEXIÓN A SQL SERVER. SI NO PASA DE AQUÍ, NO INICIA LA API
	-----------------------------------------------------------

*/

sql.connect(sqlConfig, function (err) {

       if (err) console.log(err);

       console.log("Conexión exitosa a la base de datos SQL Server.");

});

/* Utilizamos CORS para utilizar las rutas de la API desde un host externo */
/* Utilizamos BODYPARSER también para obtener los datos JSON enviados por POST */

app.use( cors() );
app.use(bodyParser.json())

/* ----------------------------------------------------------------------- */


/* Cargamos los archivos que contienen las rutas definidas para la API */

require('./rutas/modbusdata')(app, ModbusRTU);					/* Rutas de la API para la información de Modbus en tiempo real */

require('./rutas/spincliente')(app, spinLogger);					/* Rutas de la API para la información de SPIN en tiempo real */

require('./rutas/boletines')(app, sql);						/* Rutas de la API para la información de los [BOLETINES]. */

require('./rutas/maquinas')(app, sql);						/* Rutas de la API para la información de las [MÁQUINAS]. */

require('./rutas/operaciones')(app, sql);						/* Rutas de la API para la información de las [OPERACIONES]. */

require('./rutas/calendarios')(app, sql);						/* Rutas de la API para la información de los [CALENDARIOS]. */

require('./rutas/areas')(app, sql);						/* Rutas de la API para la información de las [AREAS]. */

require('./rutas/embalajes')(app, sql);						/* Rutas de la API para la información de los [EMBALAJES]. */

require('./rutas/intervenciones')(app, sql);					/* Rutas de la API para la información de las [INTERVENCIONES]. */

require('./rutas/operarios')(app, sql);						/* Rutas de la API para la información de los [OPERARIOS]. */

require('./rutas/logs')(app);							/* Rutas de la API para la información de los [LOGS]. */


/* -------------------------------------------------------------------- */

/* 

	----------------------------------------------------------
	SERVIDOR EXPRESS.JS A LA ESCUCHA DE PETICIONES DE CLIENTES
	----------------------------------------------------------

*/

app.listen(port, () => {

       console.log(`[API BACKEND] Alpesa escuchando en el puerto ${port}`)

})
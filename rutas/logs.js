module.exports = function( app ){

	const fs = require('fs')

	app.get( "/logs/spin", ( req, res ) => {

		fs.readFile( './logs/spin/spin.log', 'utf-8', ( err, data ) => {

			if( err ){

				console.log( "[ERROR] No se han podido leer los logs de SPIN. Error detallado: " + err );
				return res.json( { err: 'No se han podido leer los logs de SPIN.' } );

			}

			return res.json( { logs: data.split("\n").slice( 0, -1 ) } );

		} );

	} );

	app.get( "/logs/spin/info", ( req, res ) => {

		fs.readFile( './logs/spin/spin-info.log', 'utf-8', ( err, data ) => {

			if( err ){

				console.log( "[ERROR] No se han podido leer los logs de SPIN. Error detallado: " + err );
				return res.json( { err: 'No se han podido leer los logs de SPIN.' } );

			}

			return res.json( { logs: data.split("\n").slice( 0, -1 ) } );

		} );

	} );

	app.get( "/logs/spin/error", ( req, res ) => {

		fs.readFile( './logs/spin/spin-error.log', 'utf-8', ( err, data ) => {

			if( err ){

				console.log( "[ERROR] No se han podido leer los logs de SPIN. Error detallado: " + err );
				return res.json( { err: 'No se han podido leer los logs de SPIN.' } );

			}

			return res.json( { logs: data.split("\n").slice( 0, -1 ) } );

		} );

	} );

}
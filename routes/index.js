var express = require( 'express' );
var router = express.Router();

var fs = require( 'fs' );
var gm = require( 'gm' ).subClass( {imageMagick: true} );
var mime = require( 'mime' );

var nodemailer = require( 'nodemailer' );
var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "cc3d.server@gmail.com",
        pass: "******"
    }
});





router.get('/', function( req, res, next ) {
    res.render( 'index', { titulo: 'Inicio' });
});


router.get( '/conchos', function( req, res, next ) {
    res.render( 'conchos', { titulo: 'Conchos' });
});


router.get( '/usumacinta', function( req, res, next ) {
    res.render( 'usumacinta', { titulo: 'Usumacinta' });
});


router.get( '/productos', function( req, res, next ) {
    res.render( 'productos', { titulo: 'Productos generados' });
});


router.get( '/equipo', function( req, res, next ) {
    res.render( 'equipo', { titulo: 'Equipo de trabajo' });
});


router.get( '/sitios_de_interes', function( req, res, next ) {
    res.render( 'sitios_de_interes', { titulo: 'Sitios de interés' });
});


router.get( '/galeria', function( req, res, next ) {
    res.render( 'galeria', { titulo: 'Galería Fotográfica' });
});


router.get( '/contacto', function( req, res, next ) {
    res.render( 'contacto', { titulo: 'Contacto' });
});


router.get( '/galeria_conchos', function( req, res, next ) {
    res.render( 'album', {
        titulo: 'Galería Conchos',
        files: getPhotos( './public/content/photos/conchos' )
    });
});


router.get( '/galeria_usumacinta', function( req, res, next ) {
    res.render( 'album', {
        titulo: 'Galería Usumacinta',
        files: getPhotos( './public/content/photos/usumacinta' )
    });
});


router.post( '/send_mail', function( req, res, next ) {
    var output = `
        <p>Hola, alguien te quiere contactar desde <strong>GRADIENTES.IMTA.MX</strong></p>
        <h3>Detalles del mensaje</h3>
        <ul>
            <li>Nombre: ${req.body.nombre}</li>
            <li>Correo electrónico: ${req.body.correo}</li>
            <li>Teléfono: ${req.body.telefono}</li>
        </ul>
        <h3>Mensaje</h3>
        <p>${req.body.mensaje}</p>`;
    var msg = {
        html: output,
        createTextFromHtml: true,
        from: '"GRADIENTE CONTACT" <cc3d.server@gmail.com>',
        to: '<martin_montero@tlaloc.imta.mx>',
        subject: 'Recibiste un Mensaje de Contacto del sitio web GRADIENTE.IMTA.MX'
    };
    transport.sendMail( msg, function (err) {
       if( err )
            console.log( err );
        else
            res.redirect( '/' );
    });
});




router.get( '/imagen/:name', function( req, res, next ) {
    var name = req.params.name;
    var path = req.query.path;
    fs.readFile( './public/content/'+path+'/thumb/'+name, function( err, content ) {
        if (err) {
            create_thumb( name, path, res );
        }
        else {
            var type = mime.getType( './public/content/'+path+'/thumb/'+name );
            res.writeHead( 200, { 'Content-type' : type } );
            res.end( content );
        }
    });
});


function getPhotos( ruta ) {
    var files = [];
    var exp = /^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/;
    var ls = fs.readdirSync( ruta );
    for( var i = 0; i < ls.length; i++ ) {
        if( exp.test( ls[i] ) ) {
            var val = String( ls[i] );
            files.push( { name: val } );
            exist_thumb( ruta, val );
        }
    }
    return files;
}


function exist_thumb( ruta, val ) {
    fs.readFile( ruta+'/thumb/'+val, function( err ) {
        if (err) {
            gm( ruta+'/'+val )
                .autoOrient()
                .write( ruta+'/tmp/'+val, (err) => {
                if (err) console.log( err );
            });
        }
    });
}


function create_thumb( name, path, res ) {
    gm( './public/content/'+path+'/'+name )
        .autoOrient()
        .resize( null, 500 )
        .write( './public/content/'+path+'/thumb/'+name, (err) => {
        if (err) {
            console.log( err ); 
        } else {
            fs.readFile( './public/content/'+path+'/thumb/'+name, function( err, content ) {
                if( err ) console.log( err );
                var type = mime.getType( './public/content/'+path+'/thumb/'+name );
                res.writeHead( 200, { 'Content-type' : type } );
                res.end( content );
            });
            fs.rename( './public/content/'+path+'/tmp/'+name, './public/content/'+path+'/'+name, function (err) {
                if (err) console.log( err ); 
            });
        }
    });
}









router.get( '/videos', function( req, res, next ) {
    //res.render( 'videos', { titulo: 'Videos' });
    res.render( 'videos', {
        titulo: 'Videos',
        videos_usumacinta: getVideos( './public/content/videos/usumacinta' ),
        videos_conchos: getVideos( './public/content/videos/conchos' )
    });
});


router.get( '/video/thumb/:name', function( req, res, next ) {
    var name = req.params.name;
    var path = './public/content/videos/thumb/';
    fs.readFile( path + name + '.jpg', function( err, content ) {
        if (err) {
            //console.log( err );
            var cont = './public/img/usumacinta.jpg';
            var type = mime.getType( './public/img/usumacinta.jpg' );
            res.writeHead( 200, { 'Content-type' : type } );
            fs.createReadStream( cont ).pipe( res );
            //res.end( cont );
        }
        else {
            var type = mime.getType( path + name + '.jpg' );
            res.writeHead( 200, { 'Content-type' : type } );
            res.end( content );
        }
    });
});


function getVideos( ruta ) {
    var files = [];
    var exp = /^.*\.(mp4|MP4)$/;
    //var exp = /^.*\.(mp4|MP4|mov|MOV|3gp|3GP)$/;
    var ls = fs.readdirSync( ruta );
    for( var i = 0; i < ls.length; i++ ) {
        if( exp.test( ls[i] ) ) {
            var val = String( ls[i] );
            var type = mime.getType( ruta+'/'+val );
            var corto = val.replace(/\..+$/, '');
            files.push( { name: val, type: type, corto: corto } );
            //exist_video_thumb( val, ruta, corto );
        }
    }
    return files;
}


function exist_video_thumb( val, ruta, corto ) {
    var ruta_thumb = './public/content/videos/thumb/';
    fs.readFile( ruta_thumb + corto + '.jpg', function( err ) {
        if (err) {
            console.log( ruta + '/' + val );
        }
        else {
            console.log( corto, ' existe' );
        }
    });
}




router.get( '/video/:name', function( req, res, next ) {
    
    console.log( 'aqui si entra', req.query.path );

    var pt = req.query.path;
    var name = req.params.name;
    var path = './public/content/'+pt+'/'+name;
    var stat = fs.statSync( path );
    var type = mime.getType( path );
    var fileSize = stat.size;
    var range = req.headers.range;
    
    if (range) {
        var parts = range.replace(/bytes=/, "").split("-");
        var start = parseInt( parts[0], 10 );
        var end = parts[1] ? parseInt( parts[1], 10 ) : fileSize - 1;
        var chunksize = ( end-start ) + 1;
        var file = fs.createReadStream( path, { start, end } );
        var head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': type,
        }
        res.writeHead( 206, head );
        file.pipe( res );
    } 
    else {
        var head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead( 200, head )
        fs.createReadStream( path ).pipe( res )
    }
});




module.exports = router;
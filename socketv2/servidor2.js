var express = require('express')
var aplicacion = express()
//Se le agrego el 25 01 19
const os = require('os')
var interface = os.networkInterfaces();
var ipdinamica;
 for(var k in interface){
for(var k2 in interface[k]){
  var address= interface[k][k2]
 if(address.family=='IPv4' && !address.internal){
 ipdinamica= address.address.toString();
 console.log("La ip que me genero Heroku : " + ipdinamica)
 }
}
}

const net = require('net')
const server = require('http').Server(aplicacion)
const socket = require('socket.io')(server)
const {StringDecoder} =  require('string_decoder')
const decoder = new StringDecoder('utf8')

var HOST = ipdinamica
var PORT = process.env.PORT || 5000;

  server.listen(PORT, function(){
      console.log('servidor activo ' + HOST + ':' + PORT)
  })

var ser = net.createServer(function(so){
    console.log('Usuario Nuevo ' + so.remoteAddress + ":" + so.remotePort)    
    so.on('data', function(data){
        console.log(decoder.write(data))
    })
    so.on('close', function(){
      
    })
})

server.listen(PORT, function() {
  console.log('Listening on ' + PORT);
});

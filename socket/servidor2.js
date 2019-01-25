var express = require('express')
var aplicacion = express()

const net = require('net')
const server = require('http').Server(aplicacion)
const socket = require('socket.io')(server)
const {StringDecoder} =  require('string_decoder')
const decoder = new StringDecoder('utf8')

var HOST = "52.72.224.148"
var PORT = 46025

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

ser.listen(PORT, HOST)

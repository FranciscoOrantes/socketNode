'use strict'
var exec = require('child_process').exec
const Setting = use('App/Models/Setting')
class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    
  }
  onMessage (message) {
  this.socket.broadcastToAll('message', message)
 console.log("Esto dijo el server") 
if(message==1){
  console.log("Ya casi esta prro tontin")
  this.show(message)
  //var comand=exec('mysqldump --user=root --password="" -h 127.0.0.1 -P 3306 npub > minpub.sql');
  //console.log(comand)
  this.socket.emit('servidor',{ response : 'Success backup'})
}
 
}
async show ({ params, request, response, view }) {
  let { id } = params;
      let setting = await Setting.findOrFail(id);
      console.log(setting)
      return response.ok(setting);
}


}

module.exports = ChatController

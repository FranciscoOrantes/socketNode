<template>

<div id="invoice">

    <div class="toolbar hidden-print">
       
       
    </div>
    <div class="invoice overflow-auto">
        <div style="min-width: 600px">
            <header>
                <div class="row">
                    <div class="col">
                        <a target="_blank" href="https://lobianijs.com">
                            <img src="https://image.winudf.com/v2/image/Y29tLnVwY2gucHJvdG90aXBvX2ljb25fMF8yOWIwZDRhMw/icon.png?w=170&amp;fakeurl=1&amp;type=.png" data-holder-rendered="true" />
                           
                            </a>
                    </div>
                    <div class="col company-details">
                        <h2 class="name">
                            <a target="_blank" href="https://lobianijs.com">
                            BACKUP
                            </a>
                        </h2>
                        <div>Francisco Orantes Trejo</div>
                     
                        
                         
                        <button type="button" class="btn btn-success" @click="crearNuevo">Crear</button>
                    </div>

                </div>
            </header>
            <main>
               

                <table border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th class="text-left">NOMBRE DEL RESPALDO</th>
                            <th class="text-left">NOMBRE DE LA BASE DE DATOS</th>
                            <th class="text-left">USUARIO</th>
                            <th class="text-right">FECHA</th>
                            <th class="text-right">HORA</th>
                            <th class="text-right">STATUS</th>
                            <th class="text-right">RESPALDO</th>
                            <th class="text-right">EDITAR</th>
                            <th class="text-right">ELIMINAR</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-bind:key="backup" v-for="backup in backups">
                            <td class="no">{{ backup.id }}</td>
                            <td class="text-left">{{ backup.name }} <h3>
                                </h3> 
                            </td>
                            <td class="unit">{{ backup.nameBd }}</td>
                            <td class="qty">{{ backup.userBd }}</td>
                             <td class="qty">{{ backup.dateb }}</td>
                             <td class="qty">{{ backup.timeBd }}</td>
                             <td class="qty">{{ backup.status }}</td>
                            <td class="qty"><button type="button" class="btn btn-success" @click="respaldar()">RESPALDAR</button></td>
                            <td class="qty"><button type="button" id="botonActualizar" class="btn btn-success" @click="actualizar(backup)" >EDITAR</button></td>
                            <td class="qty"><button type="button" class="btn btn-danger" @click="eliminar(backup)">ELIMINAR</button></td>
                        </tr>
                       
                    </tbody>
                   
                </table>

                
               
                <div class="notices">
                    <div>NOTICIA:</div>
                   
                </div>
            </main>
           
        </div>
        <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom-->
        <div></div>
    </div>
</div>
</template>

<style>
#invoice{
    padding: 30px;
}

.invoice {
    position: relative;
    background-color: #FFF;
    min-height: 680px;
    padding: 15px
}

.invoice header {
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #3989c6
}

.invoice .company-details {
    text-align: right
}

.invoice .company-details .name {
    margin-top: 0;
    margin-bottom: 0
}

.invoice .contacts {
    margin-bottom: 20px
}

.invoice .invoice-to {
    text-align: left
}

.invoice .invoice-to .to {
    margin-top: 0;
    margin-bottom: 0
}

.invoice .invoice-details {
    text-align: right
}

.invoice .invoice-details .invoice-id {
    margin-top: 0;
    color: #3989c6
}

.invoice main {
    padding-bottom: 50px
}

.invoice main .thanks {
    margin-top: -100px;
    font-size: 2em;
    margin-bottom: 50px
}

.invoice main .notices {
    padding-left: 6px;
    border-left: 6px solid #3989c6
}

.invoice main .notices .notice {
    font-size: 1.2em
}

.invoice table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 20px
}

.invoice table td,.invoice table th {
    padding: 15px;
    background: #eee;
    border-bottom: 1px solid #fff
}

.invoice table th {
    white-space: nowrap;
    font-weight: 400;
    font-size: 16px
}

.invoice table td h3 {
    margin: 0;
    font-weight: 400;
    color: #3989c6;
    font-size: 1.2em
}

.invoice table .qty,.invoice table .total,.invoice table .unit {
    text-align: right;
    font-size: 1.2em
}

.invoice table .no {
    color: #fff;
    font-size: 1.6em;
    background: #3989c6
}

.invoice table .unit {
    background: #ddd
}

.invoice table .total {
    background: #3989c6;
    color: #fff
}

.invoice table tbody tr:last-child td {
    border: none
}

.invoice table tfoot td {
    background: 0 0;
    border-bottom: none;
    white-space: nowrap;
    text-align: right;
    padding: 10px 20px;
    font-size: 1.2em;
    border-top: 1px solid #aaa
}

.invoice table tfoot tr:first-child td {
    border-top: none
}

.invoice table tfoot tr:last-child td {
    color: #3989c6;
    font-size: 1.4em;
    border-top: 1px solid #3989c6
}

.invoice table tfoot tr td:first-child {
    border: none
}

.invoice footer {
    width: 100%;
    text-align: center;
    color: #777;
    border-top: 1px solid #aaa;
    padding: 8px 0
}

@media print {
    .invoice {
        font-size: 11px!important;
        overflow: hidden!important
    }

    .invoice footer {
        position: absolute;
        bottom: 10px;
        page-break-after: always
    }

    .invoice>div:last-child {
        page-break-before: always
    }
}
</style>
<script src="https://pushjs.org/scripts/push.min.js"></script>
<script>
import {API} from '../Servicios/axios';
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')

export default {
  async created() {
    this.getBackups() 
    this.inicializarWs()
   
    },
    data(){
        return{
          backups: [],
          chat : null,
          message: "Hola prro tonto",
          status: 1
        }
    },
    methods:{
    getBackups(){
        API.get("http://localhost:3333/api/v1/settings").then (response =>
        {   // eslint-disable-next-line
            this.backups=response.data
             
            // eslint-disable-next-line
            console.log(response.data)
        })
    },
    eliminar(backup){
      var url= 'http://localhost:3333/api/v1/settings-eliminar/'+backup.id
       API.delete(url).then(response =>{
           this.getBackups();
           // eslint-disable-next-line
           console.log(response);
       })
       
    },
    crearNuevo(){
        this.$router.push("/")
    },
    actualizar(backup){
       
        var url='http://localhost:3333/api/v1/settings-ver/'+backup.id
        API.get(url).then(response =>{
           localStorage.setItem('id', response.data.id)
           localStorage.setItem('name', response.data.name)
           localStorage.setItem('nameBd', response.data.nameBd)
           localStorage.setItem('userBd', response.data.userBd)
           localStorage.setItem('passwordBd', response.data.passwordBd)
           localStorage.setItem('port', response.data.port)
           localStorage.setItem('ip', response.data.ip)
           localStorage.setItem('descripcionBd', response.data.descripcionBd)
           localStorage.setItem('dateb', response.data.dateb)
           localStorage.setItem('timeBd', response.data.timeBd)
           localStorage.setItem('status', response.data.status)
             // eslint-disable-next-line
            console.log(response);
        })
       this.$router.push("/actualizar-backup")
    },
    inicializarWs: async function(){
     ws.connect();
     this.chat=ws.subscribe('chat')
     let chat = this.chat
     chat.on('servidor', () => {
         this.sendId("Hola prro")
     console.log("Hola cliente, estoy listo")
      
     })
    },
       sendId: async function(message){
        this.chat.emit('message',message)
        Push.create('Conectado al servidor');  
    },
    respaldar: async function(){
        console.log('respaldar')
        this.chat.emit('message','1')
    }
    
    }
}
</script>
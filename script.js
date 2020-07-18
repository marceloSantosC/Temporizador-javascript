function Timer(minutos, segundos, notificar = () => {}){

    this.minutos = minutos;
    this.segundos = segundos;
    this.notificar = notificar;
    this.pausado;
    let intervalo;
    this.decrementarTempo = () => {
        if(!this.pausado) {
            if(this.minutos == 00 & this.segundos == 00) {
                this.pausado = true;
            }
            else if(this.segundos == 0 || this.minutos == 1) {
                this.minutos--;
                this.minutos < 10 ? '0' + this.minutos :  this.minutos;
                this.segundos = 59;
            }
            else if(this.segundos > 0) {                    
                this.segundos--;
                this.segundos < 10 ? '0' + this.segundos :  this.segundos;
            }
            this.notificar(this.minutos, this.segundos, this.terminado)
        }
    }
    this.contar = function(){
        if(this.pausado) {
            this.pausado = false;
            clearInterval(intervalo);
            intervalo = setInterval(this.decrementarTempo, 1000, this)
        } else {
            intervalo = setInterval(this.decrementarTempo, 1000, this)
        }

    }.bind(this);
    this.pausar = function(){
        this.pausado = true;
    }.bind(this);
    this.resetar = function() {
        clearInterval(intervalo);
        this.despausar;
        this.minutos = minutos;
        this.segundos = segundos;
        notificar(minutos, segundos)
    }.bind(this);
    this.terminar = function() {
        this.terminado = true;
        this.notificar(this.minutos, this.segundos, this.terminado);
    }.bind(this);
}

function Tempo(idmin, idseg){
    min = document.getElementById(idmin);
    seg = document.getElementById(idseg);

    this.setMinutos = function (minutos) {
        min.innerHTML = minutos;
    };
    this.setSegundos = function (segundos) {
        seg.innerHTML = segundos;
    };
    this.getMinutos = function () {
        return min.innerHTML;
    };
    this.getSegundos =  function (){
        return seg.innerHTML;
    };
    this.notificar = (minutos, segundos, terminado) => {
        if(!terminado) {
            this.setMinutos(minutos);
            this.setSegundos(segundos);
        } 
    }
}









 

 



 
function Timer(minutos, segundos, callback = () => {}){
    this.minutos = minutos;
    this.segundos = segundos;
    this.pausado;
    let intervalo;
    let valorInicial = {min: this.minutos, seg: this.segundos};
    this.setMinutos = function (min) {
        this.minutos = min;
        valorInicial.min = min;
    }
    this.setSegundos = function (min) {
        this.segundos = min;
        valorInicial.seg = min;
    }
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
            callback(this.minutos, this.segundos, this.terminado)
        }
    }
    this.contar = function(){
        if(this.pausado) {
            this.pausado = false;
            clearInterval(intervalo);
            intervalo = setInterval(this.decrementarTempo, 1000, this)
        } else {
            valorInicial = {min: this.minutos, seg: this.segundos};
            intervalo = setInterval(this.decrementarTempo, 1000, this)
        }

    }.bind(this);
    this.pausar = function(){
        this.pausado = true;
    }.bind(this);
    this.resetar = function() {
        clearInterval(intervalo);
        this.minutos = valorInicial.min;
        this.segundos = valorInicial.seg;
        callback(this.minutos, this.segundos);
    }.bind(this);
    this.terminar = function() {
        this.terminado = true;
        callback(this.minutos, this.segundos, this.terminado);
    }.bind(this);
}

function TimerServices(idmin, idseg){
    this.min = document.getElementById(idmin);
    this.seg = document.getElementById(idseg);
    this.timer = new Timer(min.innerHTML, seg.innerHTML, (minutos, segundos, terminado) => {
        if(!terminado) {
            this.setMinutos(minutos);
            this.setSegundos(segundos);
        }
    });

    this.pausar = function() {
        this.timer.pausar();
    }.bind(this);

    this.iniciar = function() {
        this.timer.contar();
    }.bind(this);

    this.resetar = function () {
        this.timer.resetar();
    }.bind(this);

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

    this.onchangeMin = function(min) {
        this.timer.resetar(min, this.getSegundos());
        this.timer.setMinutos(min);
        this.setMinutos(min);

    }.bind(this);

    this.onchangeSeg = function(seg) {
        this.timer.resetar(this.getMinutos(), seg);
        this.timer.setSegundos(seg);
        this.setSegundos(seg);

    }
}









 

 



 
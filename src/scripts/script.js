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
                callback(true);
            }
            else if(this.segundos == 0) {
                this.minutos--;
                this.segundos = 59;
            }
            else if(this.segundos > 0) {                    
                this.segundos--;
            }
            callback(false ,this.minutos, this.segundos);
        }
    }
    this.contar = function(){
        if(this.pausado) {
            this.pausado = false;
            clearInterval(intervalo);
            intervalo = setInterval(this.decrementarTempo, 1000, this)
        } else {
            clearInterval(intervalo);
            valorInicial = {min: this.minutos, seg: this.segundos};
            intervalo = setInterval(this.decrementarTempo, 1000, this)
        }
    }.bind(this);
    this.pausar = function(){
        clearInterval(intervalo);
        this.pausado = true;
    }.bind(this);
    this.resetar = function() {
        clearInterval(intervalo);
        this.minutos = valorInicial.min;
        this.segundos = valorInicial.seg;
        callback(false ,this.minutos, this.segundos);
    }.bind(this);
}

function TimerServices(idmin, idseg){
    this.min = document.getElementById(idmin);
    this.seg = document.getElementById(idseg);
    this.terminado = false;
    this.timer = new Timer(min.innerHTML, seg.innerHTML, (terminado, minutos, segundos) => {
        this.terminado = terminado;
        if(!this.terminado) {
            this.setMinutos(minutos);
            this.setSegundos(segundos);
        } else if (this.terminado) {
            this.notificarFimDaContagem(0);
        }
    });

    this.reiniciar = function() {
        if(this.getMinutos > 0 || this.getSegundos > 0) {
            this.resetar();
            this.iniciar();
        }
        this.notificarFimDaContagem(1);
    }.bind(this);

    this.notificarFimDaContagem = function (acao) {
        const alertaFimDoEvento = document.getElementById('alertafimevento');
        if(acao == 0) {
            this.tocarOuReiniciarMusica(0);
            alertaFimDoEvento.style = 'visibility: visible;';
        } else {
            this.tocarOuReiniciarMusica(1);
            alertaFimDoEvento.style = 'visibility: hidden;';
        }
    }.bind(this);

    this.tocarOuReiniciarMusica = function (acao) {
        const audio = document.getElementById('audio');
        if(acao == 0) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }.bind(this);
    
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
        minutos = minutos < 10 ? '0' + minutos :  minutos;
        min.innerHTML = minutos;
    };
    this.setSegundos = function (segundos) {
        segundos = segundos < 10 ? '0' + segundos :  segundos;
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
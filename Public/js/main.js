function exec(path){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {

        }
    }
    xhr.open("POST", path, true);
    xhr.send();
}

function gerarPastas() {
    exec("/gerarPastas");
}

function gerarClasses() {
    exec("/gerarClasses");
}

function gerarBd() {
    exec("/gerarBd");
}

function gerarApi() {
    exec("/gerarApi");
}

function gerarFrontOffice() {
    exec("/gerarFrontOffice");
}

function gerarBackOffice() {
    exec("/gerarBackOffice");
}
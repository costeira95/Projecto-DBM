function exec(path){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {

        }
    }
    xhr.open("POST", path, true);
    xhr.send();
}

function generateFolders() {
    exec("/generateFolders");
}

function generateClasses() {
    exec("/generateClasses");
}

function generateDatabase() {
    exec("/generateDatabase");
}
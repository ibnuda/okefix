var isi = "";
var lemper = new Array();
document.getElementById('files').addEventListener('change', readFile, false);

    function readFile (evt) {
        var files = evt.target.files;
        var file = files[0];           
        var reader = new FileReader();
        var isi = "";
        reader.onload = function() {
            console.log(this.result);            
            document.getElementById("list").innerHTML = this.result;
            //ngahaha(this.result);
            isi = this.result;
            ngahaha(isi);
        }
        reader.readAsText(file)
    }

function ngahaha(isi){
    //kalimat = awal huruf kapital, akhiran tanda seru / titik / tanya.
    var lemper = isi.match(/\(?[0-9A-Z][^\.\?\!]+[\.!\?]\)?/g);
    for ( var i = 0, len = lemper.length; i < len; i++){
        document.getElementById("are").innerHTML +=  '<li>' + lemper[i] + '</li>' ;
    }
}


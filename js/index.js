$(function () {
    var divAberta = "";
    var imgAberta = "";
    var imgAchada = 0;
    var Fonte = "#boxcard";
    var imgFonte = ['img/facebook.png','img/facebook.png', 'img/android.png','img/android.png', 'img/chrome.png','img/chrome.png', 'img/firefox.png','img/firefox.png', 'img/html5.png','img/html5.png', 'img/googleplus.png','img/googleplus.png', 'img/twitter.png','img/twitter.png', 'img/windows.png','img/windows.png'];
    /*var imgFonte = ['img/facebook.png', 'img/android.png', 'img/chrome.png', 'img/firefox.png', 'img/html5.png', 'img/googleplus.png','img/twitter.png','img/windows.png'];*/
    var inicioTempo;
    var time;

    function IniciarJogo() {
        for (let o = 1; o < 2; o++) {
            $.each(imgFonte, function (i, val) {
                $(Fonte).append("<div class=cartas id=card" + o + i + "><img src=" + val + " />");
            });
        }
        $(Fonte + " div").css("visibility", "visible");
        $("#init").click(Inicia);
        $("#reset").click(Reset);
        $(Fonte + " div").click(AbrirCarta);
    } IniciarJogo();

    function Inicia() {
        $(Fonte + " div img").css("visibility", "visible");
        ShuffleImages();
        $(Fonte + " div img").fadeOut(3000, "linear");
        $(Fonte + " div").css("visibility", "visible");
        $(Fonte + " div").click(AbrirCarta);
        inicioTempo = $.now();
    }

    function AbrirCarta() {
        var id = $(this).attr("id");
        if ($("#" + id + " img").is(":hidden")) {
            $(Fonte + " div").unbind("click", AbrirCarta);
            $("#" + id).css("background-image", "none");
            $("#" + id + " img").slideDown(100, "linear");
            if (imgAberta == "") {
                divAberta = id;
                imgAberta = $("#" + id + " img").attr("src");
                setTimeout(function () {
                    $(Fonte + " div").bind("click", AbrirCarta)
                }, 300);
            } else {
                let AtualAberta = $("#" + id + " img").attr("src");
                if (imgAberta != AtualAberta) {
                    setTimeout(function () {
                        $("#" + id + " img").fadeOut(1000, "linear");
                        $("#" + divAberta + " img").fadeOut(1000, "linear");
                        divAberta = "";
                        imgAberta = "";
                    }, 700);
                } else {
                    imgAchada++;
                    divAberta = "";
                    imgAberta = "";
                    CheckWin ();
                }
                setTimeout(function () {
                    $(Fonte + " div").bind("click", AbrirCarta)
                }, 700);
            }
        }
    }
    function CheckWin() {
        
            if (imgAchada == imgFonte.length - 8) {
                $("#time").prepend('<span id="success">Você ganhou: </span>');
                let finalTempo = $.now();
                let tempoTotal = (finalTempo - inicioTempo) / 1000;
                $("#time").html(tempoTotal + " segundos");
                localStorage.setItem('tempo', tempoTotal);
                let temmpo = localStorage.getItem('tempo');
                setTimeout(function () {
                    alert("Você ganhou, seu tempo em segundos é " + temmpo);
                }, 300);
                
            }
    }
    function RandomizarImagens(MaxValue, MinValue) {

        return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
    }

    function ShuffleImages() {
        let imgAll = $(Fonte).children();
        let imgThis = $(Fonte + " div:first-child");
        let ImgArr = [];
        for (let i = 0; i < imgAll.length; i++) {
            ImgArr[i] = $("#" + imgThis.attr("id") + " img").attr("src");
            imgThis = imgThis.next();
        }
        imgThis = $(Fonte + " div:first-child");
        for (let i = 0; i < imgAll.length; i++) {
            let randomNumero = RandomizarImagens(0, ImgArr.length - 1);
            $("#" + imgThis.attr("id") + " img").attr("src", ImgArr[randomNumero]);
            ImgArr.splice(randomNumero, 1);
            imgThis = imgThis.next();
        }
    }

    function Reset() {
        location.reload();
    }
}());

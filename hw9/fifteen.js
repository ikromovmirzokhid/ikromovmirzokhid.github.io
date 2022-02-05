/*Variabili che tracciano le informazioni della casella bianca.*/
var blankX, blankY, blankId;
var p, isWin;

/*Inizializzatore del meccanismo, viene eseguito al caricamento del dom. Aggiunge gli id a tutti i div e inzializza le info sulla casella bianca. Poi avvia il meccanismo con updateColor() ed enableMove().*/
document.observe("dom:loaded", function(){
    $("shufflebutton").observe("click", shuffle);
    let pieces = $$("#puzzlearea > div");
    let x = 0, y = 0;
    for(let i = 0; i < pieces.length; i++){
        x = -((i % 4) * 100);
        y = -(Math.floor(i / 4) * 100);
        pieces[i].style.backgroundPosition = x + "px " + y + "px";
        pieces[i].id = (i % 4) + "_" + (Math.floor(i / 4));
    }
    Object.prototype.canMove = __canMove;
    blankX = 3;
    blankY = 3;
    blankId = "3_3";
    p = document.createElement("p");
    p.id = "winpar";
    p.innerHTML = "Complimenti! Hai vinto!";
    isWin = false;
    updateColor();
    enableMove();
});

/*La funzione è listener del click sui div del puzzle, e veriricherà se l'elemento può muoversi e in caso positivo, chiamerà updatePosition().*/
function moveDiv(event){
    let pos = this.canMove();
    if(pos != null)
        updatePosition(this.id, pos.x, pos.y, 0.5);
}

/*La funzione è il listener del click sul pulsante shuffle. Inizializza il meccanismo di mescolamento (didabilita i movimenti e i colori) ed estrae il numero n random passato poi a shufflePos().*/
function shuffle(){
    if(isWin){
        p.remove();
        isWin = false;
    }
    updateColor(true);
    disableMove();
    shufflePos(Math.floor(Math.random() * 500) + 100);
}

/*La funzione è "ricorsiva" ed effettua n spostamenti casuali.*/
function shufflePos(n){
    if(n != 0)
        randomMove(0.01, shufflePos, (n - 1));
    else{
        updateColor();
        enableMove();
    }
}

/*La funzione effettua una mossa casuale a ritroso, cioè partendo dal pezzo bianco. Sceglierà casualmente in quale direzione effettuare la mossa, in base alla posizione della casela bianca.*/
function randomMove(dur, _callback, n){
    let x = 0, y = 0;
    if(Math.floor(Math.random() * 2) == 1){
        x = blankX;
        if(blankY == 3)
            y = blankY - 1;
        else if(blankY == 0)
            y = blankY + 1;
        else{
            if(Math.floor(Math.random() * 2) == 1)
                y = blankY - 1;
            else
                y = blankY + 1;
        }
    }
    else{
        y = blankY;
        if(blankX == 0)
            x = blankX + 1;
        else if(blankX == 3)
            x = blankX - 1;
        else{
            if(Math.floor(Math.random() * 2) == 1)
                x = blankX - 1;
            else
                x = blankX + 1;
        }
    }
    let pos = $(x + "_" + y).canMove();
    if(pos != null)
        updatePosition((x + "_" + y), pos.x, pos.y, dur, _callback, n);
    else
        moving = false;
}

/* La funzione muove un div alle nuove coordinate. In caso si stia eseguendo shufflePos(), _callback sarà definita con il riferimento a quest'ultima, per poter effettuare la chiamata ricorsiva.*/
function updatePosition(id, newX, newY, dur, _callback, n){
    disableMove();
    new Effect.Move(id, {x: newX, y: newY, mode: 'relative', duration: dur, afterFinish: function(){
        blankX += -Math.floor(newX / 100);
        blankY += -Math.floor(newY / 100);
        $(id).id = blankId;
        blankId = id;
        moving = false;
        enableMove();
        if(_callback != undefined)
            _callback(n);
        else{
            updateColor();
            checkSolved();
        }
    }});
    //console.log("Sposto il div: " + newX + ", " + newY);
}

/*La funzione controlla se il puzzle è stato risolto.*/
function checkSolved(){
    let divs = $$("#puzzlearea > div");
    let done = true;
    for(let i = 0; i < divs.length; i++){
        let div = divs[i];
        let coord = div.id.split("_");
        let x = parseInt(coord[0]);
        let y = parseInt(coord[1]);
        if(parseInt(div.innerHTML) != (x + (y * 4) + 1))
            done = false;
    }
    if(done){
        if(!isWin){
            document.body.insertBefore(p, $("puzzlearea"));
            isWin = true;
        }
    }
    else
        if(isWin){
            p.remove();
            isWin = false;
        }
}

/*La funzione abilita il movimento per tutte le caselle: aggiunge gli osservatori dei click ad ogni div.*/
function enableMove(){
    $$("#puzzlearea > div").each(function(div){
        div.observe("click", moveDiv);
    });
}

/*La funzione disabilita il movimento per tutte le caselle: rimuove gli osservatori dei click da ogni div.*/
function disableMove(){
    $$("#puzzlearea > div").each(function(div){
        div.stopObserving("click", moveDiv);
    });
}

/*La funzione aggiorna le classi css: se il div si può gli assegnerà la classe movable, altrimenti la si toglierà. Se disable è definito, rimuoverà la classe a tutti gli elementi.*/
function updateColor(disable){
    $$("#puzzlearea > div").each(function(div){
        if(disable){
            if(div.hasClassName("movable"))
                div.removeClassName("movable");
        }
        else{
            if(div.canMove() != null){
                if(!div.hasClassName("movable"))
                    div.addClassName("movable");
            }
            else {
                if(div.hasClassName("movable"))
                    div.removeClassName("movable");
            }
        }
    });
}

/* La funzione, che verrà agganciata ad un metodo canMove() chiamabile su un oggetto, ritorna le nuove coordinate se esso si piò muovere, null altrimenti */
function __canMove(){
    let posX = this.offsetLeft, posY = this.offsetTop;
    let pposX = this.parentElement.offsetLeft, pposY = this.parentElement.offsetTop;
    let x = Math.abs(Math.floor((pposX - posX) / 100));
    let y = Math.abs(Math.floor((pposY - posY) / 100));
    if((x == blankX) && Math.abs(y - blankY) == 1)
        return {x: 0, y: ((y - blankY)*(-100))};
    else if((y == blankY) && Math.abs(x - blankX) == 1)
        return {x: ((x-blankX)*(-100)), y: 0};
    else
        return null;
}

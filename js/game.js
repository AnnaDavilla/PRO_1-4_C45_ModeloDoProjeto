class Game{
    constructor(){

    }
getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
        gameState = data.val();
    })
}

update(state) {
    database.ref('/').update({
        gameState: state
    });
}

async start() {
    if (gameState === 0) {
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()) {
            playerCount = playerCountRef.val();
            player.getCount();
        }
        form = new Form()
        form.display();
    }
    player1 = createSprite(200,500);
    player1.addImage("jogador1",player_img);

    player2 = createSprite(800,500);
    player2.addImage("jogador2", player_img);
    players=[player1,player2];
}

play(){

    form.hide();

    Player.getPlayerInfo();
    player.getPlayerAtEnd();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        for(var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            
            if(index === player.index){ 
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25);
            }
                textSize(25);
                fill("white");
                text("Player 1 :" +allPlayers.player1.score,50,50);
                text("Player 2 :" + allPlayers.player2.score, 50, 100);
        }
    
    if(player.score>=5){
        player.rank += 1;
        Player.updatePlayerAtEnd(player.rank);
        player.update();
        this.showRank();
        gameState = 2; 

    }
        

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
        player.distance -= 10
        player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
        player.distance += 10
        player.update();
    }

        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
            
        }
        
        if (player.index !== null) {
            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup.get(i).isTouching(players)) {
                    fruitGroup.get(i).destroy();
                    player.score =player.score+1;
                    player.update();
                    
                }
                
            }
        }
    




    
}
showRank() {
swal({
title: `Incrível!${"\n"}Classificação${"\n"}${player.rank}`,
text: "Você alcançou o fim do jogo com sucesso",
imageUrl:
    "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
imageSize: "100x100",
confirmButtonText: "Ok"
});
}





gameOver() {
//     preencha com a cor branca
fill ("white")

//  imprimir a mensagem de fim de jogo
text ("Você venceu", 50,50)
}


end(){
    console.log("O Jogo Terminou");
    console.log(player.rank)
    this.gameOver();
}

}

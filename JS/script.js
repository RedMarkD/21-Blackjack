//initialise the deck
let card;
let symbols = ["clubs", "diamonds", "hearts", "spades"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let values21 = [11,2,3,4,5,6,7,8,9,10,10,10,10];
let imgSrcs = [
//Clubs
    "IMG/cardClubsA.png","IMG/cardClubs2.png","IMG/cardClubs3.png", "IMG/cardClubs4.png", "IMG/cardClubs5.png", "IMG/cardClubs6.png", "IMG/cardClubs7.png",
    "IMG/cardClubs8.png", "IMG/cardClubs9.png", "IMG/cardClubs10.png", "IMG/cardClubsJ.png", "IMG/cardClubsQ.png", "IMG/cardClubsK.png",
    //Diamonds
    "IMG/cardDiamondsA.png","IMG/cardDiamonds2.png","IMG/cardDiamonds3.png", "IMG/cardDiamonds4.png", "IMG/cardDiamonds5.png", "IMG/cardDiamonds6.png", "IMG/cardDiamonds7.png",
    "IMG/cardDiamonds8.png", "IMG/cardDiamonds9.png", "IMG/cardDiamonds10.png", "IMG/cardDiamondsJ.png", "IMG/cardDiamondsQ.png", "IMG/cardDiamondsK.png",
    //Hearts
    "IMG/cardHeartsA.png","IMG/cardHearts2.png","IMG/cardHearts3.png", "IMG/cardHearts4.png", "IMG/cardHearts5.png", "IMG/cardHearts6.png", "IMG/cardHearts7.png",
    "IMG/cardHearts8.png", "IMG/cardHearts9.png", "IMG/cardHearts10.png", "IMG/cardHeartsJ.png", "IMG/cardHeartsQ.png", "IMG/cardHeartsK.png",
    //Spades
    "IMG/cardSpadesA.png","IMG/cardSpades2.png","IMG/cardSpades3.png", "IMG/cardSpades4.png", "IMG/cardSpades5.png", "IMG/cardSpades6.png", "IMG/cardSpades7.png",
    "IMG/cardSpades8.png", "IMG/cardSpades9.png", "IMG/cardSpades10.png", "IMG/cardSpadesJ.png", "IMG/cardSpadesQ.png", "IMG/cardSpadesK.png",
];
let deck = new Array();

(function initDeck(){
    for (let i = 0; i < symbols.length; i++) {
        for (let x = 0; x < values.length; x++) {
            card = {Value: values[x], Symbol: symbols[i], Value21: values21[x], Image: imgSrcs[x]};
            deck.push(card);
        }
    }
    return deck;
})();
// Do You want a card?
document.getElementById("deal").addEventListener("click", function(){
    for (let i=0; i<2; i++){
    cardId = Math.floor((Math.random()*51));
    cardValue = deck[cardId];
    console.log(cardValue);
    newCard = document.getElementById("drawnCard").content.cloneNode(true);
    console.log(newCard);
    newCard.querySelector(".symbol").innerText = cardValue.Symbol;
    newCard.querySelector(".number").innerText = cardValue.Value;
    newCard.querySelector(".value").innerText = "worth"+ cardValue.Value21;
    newCard.querySelector(".newCard").src =  cardValue.Image;
    console.log(newCard);
    totalValuePlayer += cardValue.Value21;
    console.log(totalValuePlayer);
    score.innerText = totalValuePlayer;
    player.appendChild(newCard);
}})

// we need to define different variables for the different valueS.
let cardId
let cardValue;
let totalValuePlayer = 0;
let totalValueHouse = 0;
let aceHit;
let newCard;
let score = document.getElementById("score")
let player = document.getElementById("player");
let house = document.getElementById("house");
let winner = document.getElementById("winner");
let aceHitHouse;
let houseText = document.getElementById("houseText");
let houseScore = document.getElementById("houseScore");;
document.getElementById("card").addEventListener("click", function (){
    cardId= Math.floor((Math.random() * 51));
    cardValue = deck[cardId];
    console.log(cardValue);
    newCard = document.getElementById("drawnCard").content.cloneNode(true);
    console.log(newCard);
    newCard.querySelector(".symbol").innerText = cardValue.Symbol;
    newCard.querySelector(".number").innerText = cardValue.Value;
    newCard.querySelector(".value").innerText = "worth"+ cardValue.Value21;
    newCard.querySelector(".newCard").src =  cardValue.Image;
    console.log(newCard);
    totalValuePlayer += cardValue.Value21;
    console.log(totalValuePlayer);
    score.innerText = totalValuePlayer;
    player.appendChild(newCard);
    if (cardValue.Value === "A") {
        aceHit = true;
    }
    if (totalValuePlayer < 21) {
       winner.innerText = "Do you want another card? Click the button"
    }
    else if (totalValuePlayer === 21) {
        winner.innerText = "Blackjack"
    }
    else if (totalValuePlayer > 21) {
        if (aceHit === true) {
            totalValuePlayer -= 10
            aceHit = false
        }
        else {
            winner.innerText = "Player BUST"
        }
    }
})

function houseCall() {
    cardId = Math.floor((Math.random() * 51));
    cardValue = deck[cardId];
    console.log(cardValue);
    newCard = document.getElementById("drawnCard").content.cloneNode(true);
    console.log(newCard);
    newCard.querySelector(".symbol").innerText = cardValue.Symbol;
    newCard.querySelector(".number").innerText = cardValue.Value;
    newCard.querySelector(".value").innerText = "worth" + cardValue.Value21;
    newCard.querySelector(".newCard").src = cardValue.Image;
    console.log(newCard);
    totalValueHouse += cardValue.Value21;
    console.log(totalValueHouse);
    houseScore.innerText = totalValueHouse;
    house.appendChild(newCard);
    if (cardValue.Value === "A") {
        aceHitHouse = true;
    }
}
let win = document.getElementById("win")
function winCheck() {
    if (totalValuePlayer>21 && totalValueHouse>21){
        win.innerText = "Double BUST";
    }
    if (totalValuePlayer === totalValueHouse) {
        win.innerText = "Tie, in the long run, the house always wins."
    }
    else if (totalValuePlayer > totalValueHouse) {
        win.innerText = "You win, good job"
    }
    else if (totalValuePlayer < totalValueHouse) {
        win.innerText = "The man wins, tough luck"
    }
}

document.getElementById("dealer").addEventListener("click", function () {
    houseCall();
    if (totalValueHouse === 21) {
        houseText.innerText = "Blackjack House";
    }
    if (21 > totalValueHouse > 17) {
        houseText.innerText = "House stops";
    }
    if (totalValueHouse < 17) {
        houseCall();
        winCheck();
        if (totalValueHouse < 17) {
            houseCall();
            winCheck();
            if (totalValueHouse < 17) {
                houseCall();
                winCheck();
            }
            else if (totalValueHouse > 21) {
                if (aceHitHouse === true) {
                    totalValueHouse -= 10;
                    aceHitHouse = false;
                    if (totalValueHouse < 17) {
                        houseCall();
                        winCheck();
                        if (totalValueHouse < 17) {
                            houseCall();
                            winCheck();
                        }
                        else {
                            houseText.innerText = "House stops";
                        }
                    }
                    else {
                        houseText.innerText = "House stops";
                        winCheck();
                    }

                }
                else {
                    houseText.innerText = "House BUST";
                    winCheck();
                }
            }
        }
        else {
            winCheck()
        }
    }
    else {
        winCheck()
    }
})
//basic rules: Ace 1 or 11, king, queen and jack are 10. cards array, 2,3,4,5,6,7,8,9,10,jack,queen,king,ace


// Yes / No
//Bust or not
// make PC draw a card and
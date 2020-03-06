console.log('hi') 
window.onload = function() {
//SETUP
  //Canvas
      const canvas = document.getElementById('canvas')
      const c = canvas.getContext('2d');
    //
    //Game Declarations
      let game = {}
      game.imageArr = []
      game.cdcatVsAllFloor = [];
      game.cdCatFloorFiltered= [];
      game.cdcatVsAllItem = [];
      game.cdCatItemFiltered=[];
      game.mouseXY = {}
      game.score = 0
      game.cdFT = ""
      game.scoreT = ""
      game.catJumpCount = 0;
      game.allScores = []
      game.allScorecopy = []
      game.reverseScore = []
    //
//

//Image
  //Preload image global variable declaration and default values
    var loadcount = 0;
    var loadtotal = 0;
    var preload = false;
    var initialized = false;
  //  
  //Declaring images into to make it easier to referrence when drawing
    var genCat;      
    var genButton;   
    var genBG;       
    var pgBG;        
    var pgHS;        
    var pgIns;       
    var igFloor1;    
    var igFloor2;    
    var igFloor3;    
    var igItem1;     
    var igItem2;     
    var igItem3;     
    var igItem4;     
    var igItem5;     
    var igItem6;     
    var egBG;        
    var egCatGrave;  
  
  //
  //All Images Source Array - *requires input* when want to add new game images
    const gameImageSrcArr =  
        [   "GameImages/1-General/genCat.gif",
            "GameImages/1-General/genButton.png",
            "GameImages/1-General/genBG.png",
            "GameImages/2-PreGame/pgBG.png",
            "GameImages/2-PreGame/pgHS.png",
            "GameImages/2-PreGame/pgInst.png",
            "GameImages/3-InGame/igFloor1.png",
            "GameImages/3-InGame/igFloor2.png",
            "GameImages/3-InGame/igFloor3.png",
            "GameImages/3-InGame/igItem1.png",
            "GameImages/3-InGame/igItem2.png",
            "GameImages/3-InGame/igItem3.png",
            "GameImages/3-InGame/igItem4.png",
            "GameImages/3-InGame/igItem5.png",
            "GameImages/3-InGame/igItem6.png",
            "GameImages/4-EndGame/egBG.png",
            "GameImages/4-EndGame/egCatGrave.png"  ]
  //
  //Load Image Function Declaration
    function loadImages(inputArr) {
      // Initialize Global Count Variables
        loadcount = 0;
        loadtotal = inputArr.length;
        preload = false;
      // In-function Loaded Image Array
        var loadedimages = [];
      //For every item in the inputArr...
        for (var i=0; i<inputArr.length; i++) {
          //Create image object 
            var image = new Image();
          //Add onload event handler
            image.onload = function () {
              //Every image loaded, increase loadcount by 1
                loadcount++;
              //When all images loaded, loadcount == loadtotal, preloaded to true
                if (loadcount == loadtotal) {   preload = true;    }
                //"true" preload will then trigger downstrean functions -aka- draw functions
            };
          // Set the source url of the image
            image.src = inputArr[i];  
          // Save image obect to loadedimages array before redefining new image object
            loadedimages[i] = image;         
        }
      // Return the array of loaded images to a variable
        return loadedimages;
    }
  //
  
//

//In-Game 
  //Objects Creation and Draw Functions Declaration
    //Cat
      //Object
        game.cat = 
          {   x: -50,
              y: -50, 
              v: 0, 
              g: 0.05,   
              d: 0, 
              f: 0    }
      //
      //Cat Draw Function
        game.drawGenCat=function(){  c.drawImage(genCat, game.cat.x, game.cat.y, 80, 50)  }
      //
    //
    //Floor
      //Floor Object Constuctor & Draw Functions
        game.FloorClass = class {
          //Constructor of floor objects
            constructor(i,j){
                this.ii = i *75
                this.y = this.ii + 20 + Math.floor(Math.random() * 18)
      
                this.n = 2 + Math.floor(Math.random() * 6)
                this.boxlength = 430
                this.nthset = j
                
                this.x = Math.floor(Math.random()*100) + this.nthset*this.boxlength
                this.lp=this.x+(this.n+2)*33
                this.counter = this.nthset *this.boxlength
            }
          //
          //Floor Regeneration Parameters
            floorReset() {
              //setting n
                this.n = 2 + Math.floor(Math.random() * 5)
              //setting x based on n
                if (this.n == 8){this.x = 860 + Math.floor(Math.random()*115)}
                else if (this.n == 7) {this.x = 860 + Math.floor(Math.random()*135)}
                else if (this.n == 6) {this.x = 860 + Math.floor(Math.random()*155)}
                else if (this.n == 5) {this.x = 860 + Math.floor(Math.random()*180)}
                else if (this.n == 4) {this.x = 860 + Math.floor(Math.random()*220)}
                else if (this.n == 3){this.x = 860 + Math.floor(Math.random()*255)}
                else {this.x = 860 + Math.floor(Math.random()*290)}
              //setting y
                this.y = this.ii + Math.floor(Math.random() * 30)
              //reset counter
                this.counter = 860
              //update this.lp
                this.lp = this.x+(this.n+2)*33
            }
          //
          //Draw Individual floor
            drawOwnFloor() {    
              // draw if floor still on screen
                if (this.counter > -430) {         
                  //Floor Beg and Floor End
                    c.drawImage(igFloor1, this.x, this.y, 33, 15)
                    c.drawImage(igFloor3, this.x  + (this.n +1)*33, this.y, 33, 15)
                  //Floor Mid
                    var i;
                    for (i = this.n-1; i >= 0 ; i--) {
                      c.drawImage(igFloor2, this.x + (this.n - i) * 33 , this.y, 33,15)    
                    }
                }
              // Regen Floor once off screen
                else {  this.floorReset()   }
            }
          //
        }
      //
      //Constructing Floor Objects cuz I got lazy
        game.constructFloorObjects = function () {
              for (i=1; i<=6; i++){
                for (j=0; j<=2; j++){
                  let a = i
                  let b = j
                game[`floor${a}${b}`]= new game.FloorClass(a,b)
              }
            }
        }
        
      //
      //All Floors Draw Function
        game.drawAllFloors = function () {
          for (i=1; i<=6; i++){
            for (j=0; j<=2; j++){
              let a = i
              let b = j
              game[`floor${a}${b}`].drawOwnFloor()
            }
          }
        }
      //     
    //
    //Item
      //Item Object Constuctor & Draw Functions
  /*        game.ItemClass = class {
          //Constructor of item objects
            constructor(i,j){
                this.ii = i *70
                this.y = this.ii + 20 + Math.floor(Math.random() * 18)
                this.n = 2 + Math.floor(Math.random() * 6)
                this.boxlength = 430
                this.nthset = j
              
                this.x = Math.floor(Math.random()*100) + this.nthset*this.boxlength
                this.lp=this.x+(this.n+2)*33
                this.counter = this.nthset *this.boxlength
            }
          //
          //Item Regeneration Parameters
            itemReset() {
              //setting n
                this.n = 2 + Math.floor(Math.random() * 6)
              //setting x based on n
                if (this.n == 8){this.x = 860 + Math.floor(Math.random()*115)}
                else if (this.n == 7) {this.x = 860 + Math.floor(Math.random()*135)}
                else if (this.n == 6) {this.x = 860 + Math.floor(Math.random()*155)}
                else if (this.n == 5) {this.x = 860 + Math.floor(Math.random()*180)}
                else if (this.n == 4) {this.x = 860 + Math.floor(Math.random()*220)}
                else if (this.n == 3){this.x = 860 + Math.floor(Math.random()*255)}
                else {this.x = 860 + Math.floor(Math.random()*290)}
              //setting y
              this.y = this.ii + 20 + Math.floor(Math.random() * 18)
              //reset counter
                this.counter = 860
              //update this.lp
              this.lp = this.x+(this.n+2)*33
            }
          //
          //Draw Individual item
            drawOwnItem() {   
              // draw if item still on screen
                if (this.counter > -430) {        
                  //Item Beg and Item End
                    c.drawImage(igItem1, this.x, this.y, 33, 15)
                    c.drawImage(igItem3, this.x  + (this.n +1)*33, this.y, 33, 15)
                
                }
              // Regen Item once off screen
                else {  this.itemReset()   }
            }
          //
        }
      //
      //Constructing Item Objects cuz I got lazy
        game.constructItemObjects = function () {
              for (i=1; i<=7; i++){
                for (j=0; j<=2; j++){
                  let a = i
                  let b = j
                game[`item${a}${b}`]= new game.ItemClass(a,b)
              }
            }
        }
      //
      //All Items Draw Function
        game.drawAllItems = function () {
          for (i=1; i<=7; i++){
            for (j=0; j<=2; j++){
              let a = i
              let b = j
              game[`item${a}${b}`].drawOwnItem()
            }
          }
        }
      */      //
    //
  //
  //Movements
    //Function of All Sprite InGame Movements 
      game.movements=function(){
        //Cat 
          //X
            if (game.cat.x < 100){game.cat.x += (5/3)}
            else {game.cat.x=100}
          //Y
            game.cat.d = 1/2*(game.cat.g) + game.cat.v + game.cat.f
            game.cat.y += game.cat.d;
            game.cat.v += game.cat.g
        //
        //Floor 
          //Only x-axis
            for (i=1; i<=6; i++){
              for (j=0; j<=2; j++){
                  let a = i
                  let b = j
                game[`floor${a}${b}`].x -=4
                game[`floor${a}${b}`].counter -=4
                game[`floor${a}${b}`].lp -=4
              }       
          
            }
        //   
        //Item 
          //Only x-axis
    /*            for (i=1; i<=7; i++){
              for (j=0; j<=2; j++){
                  let a = i
                  let b = j
                game[`item${a}${b}`].x -=4
                game[`item${a}${b}`].counter -=4
                game[`item${a}${b}`].lp -=4
              }
            }
      */        //
      }
    //  
    //User Input Cat Movement
      game.catJump = function (){
        if (game.catJumpCount<2) {
          game.cat.v = -2.78
          game.catJumpCount +=1
        }
        else {return}
      }
    //
    //Collision Detection
      //Floor-Cat
        game.cdCatFloor = function () {
          //Make an array of floor parameter at a given frame compared to cat
            //[FloorBeg x, FloorEnd x, Floor y - Cat y]
              //Push all floor vs cat arrays into one giant array
            for (i=1; i<=6; i++){
              for (j=0; j<=2; j++){
                  let a = i
                  let b = j
                game.cdcatVsAllFloor.push(
                  [   game[`floor${a}${b}`].x,
                      game[`floor${a}${b}`].lp,
                      Math.floor(game[`floor${a}${b}`].y-(game.cat.y+45))   ]
                )             
              }
            }
          //Filter the arrays that floors cat is touching
            game.cdCatFloorFiltered = game.cdcatVsAllFloor.filter (
              function(inputArray){
                return (
                  inputArray[0] <170  &&
                  inputArray[1] >135  &&
                  inputArray[2] >0    &&
                  inputArray[2] <5
                )
              }
            ) 
          //If there is an array, cat is touching floor, then cat doesn't fall (v=0,g=0)
            if (game.cdCatFloorFiltered.length > 0 && game.cat.v >=0)   {  
              game.cat.v=0, game.cat.g=0  
              game.catJumpCount=0
            }
          //else means cat is not touching floor, then cat v resumes falling   
            else {
              //adjusted according to setInterval time unit
                game.cat.v+=0.52*game.cat.g;
                game.cat.g=0.03
              //If the cat falls faster than setInterval Timer
                //then the array won't be pushed and cat flies through floor
                  //so a cap is put on the cat's velocity
                if (game.cat.v>=4)  {  game.cat.g=0.001 }
            }

          //Remove all arrays, before next round of comparison
            //theoretically, there should only be one array to be cleared
              //since the cat can't be touching all 21 floors at the same time
          for (i=0;i<18;i++){
            game.cdcatVsAllFloor.shift()
          }
        }
      //
      //Item-Cat
  /*  game.cdCatItem = function () {
      //
          //Make an array of item parameter at a given frame compared to cat
            //[ItemBeg x, ItemEnd x, Item y - Cat y]
              //Push all item vs cat arrays into one giant array
            for (i=1; i<=7; i++){
              for (j=0; j<=2; j++){
                  let a = i
                  let b = j
                game.cdcatVsAllItem.push(
                  [   game[`item${a}${b}`].x,
                      game[`item${a}${b}`].lp,
                      Math.floor(game[`item${a}${b}`].y-(game.cat.y+45))   ]
                )            
              }
            }
          //Filter the arrays that items cat is touching
            game.cdCatItemFiltered = game.catVsAllItem.filter (
              function(inputArray){
                return (
                  inputArray[0] <170  &&
                  inputArray[1] >135  &&
                  inputArray[2] >0    &&
                  inputArray[2] <5
                )
              }
            )
          //If there is an array, cat is touching item, then cat doesn't fall (v=0,g=0)
            if (game.cdCatItemFiltered.length > 0 && game.cat.v >=0)   { 
              game.cat.v=0, game.cat.g=0 
            }
          //else means cat is not touching item, then cat v resumes falling  
            else {
              //adjusted according to setInterval time unit
                game.cat.v+=0.17*game.cat.g;
                game.cat.g=0.055
              //If the cat falls faster than setInterval Timer
                //then the array won't be pushed and cat flies through item
                  //so a cap is put on the cat's velocity
                if (game.cat.v>=4)  {  game.cat.g=0.001 }
            }
      
          //Remove all arrays, before next round of comparison
            //theoretically, there should only be one array to be cleared
              //since the cat can't be touching all 21 items at the same time
          for (i=0;i<21;i++){
              game.cdcatVsAllItem.shift()
            }
          }
          */  //
        
      /*Include Item-Cat into Timer*/
      //Set time interval for comparisons
        //window.requestAnimationFrame run is about 1000/60 seconds
          //25/9 seceonds is 6x faster, so... should work LOL
        game.cdTimer = function () {
          game.cdFT = setInterval(game.cdCatFloor, 25/9)
        //  setInterval(game.cdCatItem, 25/9)
          game.scoreT = setInterval(function(){game.score += 1
          console.log('hi')}, 500)
          }
        game.clearcdTimer =function() {
          clearInterval(game.cdFT)
          clearInterval(game.scoreT)
          console.clear()
        }
      //
    //
  //
//
 
//Draw Functions
  //Gen Background
   game.drawGenBG = function(){ c.drawImage(genBG, 0,0,850,550)}
  //
  //Live Score
    game.drawLiveScore = function () {
      c.font = "800 25px Patrick Hand";
      c.fillStyle = "white"
      c.textAlign = "end";
      c.fillText(`${game.score}`, 825, 40)}
  //
  //Menu
    game.drawMenu = function() {
      c.clearRect(0,0,850,550)
      c.drawImage(pgBG, 0,0, 850 ,550)
      c.drawImage(genCat, 228,70,360,180)
      c.drawImage(genButton,240,271,350,130)
  
      c.font = "800 100px Patrick Hand";
      c.fillStyle = "white"
      c.textAlign = "left";
      c.fillText("P L A Y", 290, 370)
  
      c.font = "400 40px Patrick Hand";
      c.fillStyle = "white"
      c.fillText("INSTRUCTIONS", 305, 450)
      c.font = "400 25px Patrick Hand";
      c.fillText("High Scores", 25,40)
    }
  //
  //Back To Menu
    game.drawBack = function () { 
      c.font = "400 25px Patrick Hand";
      c.fillStyle = "white"
      c.textAlign = "left";
      c.fillText("Back to Menu", 25, 40)
    }
  //
  //Instructions
    game.drawIns = function() {
      c.clearRect(0,0,850,550)
      c.drawImage(genBG, 0,0, 850 ,550)
      c.drawImage(pgIns, 0,0, 850 ,550)
      c.font = "800 35px Patrick Hand";
      c.fillStyle = "white"
      c.textAlign = "left";
        
      c.fillText("Click to Jump", 390, 180)
      c.fillText("Click 2x to Jump Higer", 390, 230)
      c.fillText("Items - coming soon!", 390, 335)
      c.font = "400 20px Patrick Hand";
      c.fillText("(When I'm not sleep deprived T-T)", 390, 365)
      game.drawBack()
    }
  //
  //High Score
    game.drawHS = function() {
      c.clearRect(0,0,850,550)
      c.drawImage(genBG, 0,0, 850 ,550)
      c.drawImage(pgHS,0,0, 850 ,550)
      
      
      
      for(var i = 0;i < 5; i++){
          if(this.reverseScore[i]){
            c.font = "400 45px Patrick Hand";
          c.fillStyle = "white"
          c.textAlign = "left";
          c.fillText(`${game.reverseScore[i]}`, 205, 246+49*i)}}
      for(var i = 5;i < 10; i++){
        if(this.reverseScore[i]){
        c.font = "400 45px Patrick Hand";
          c.fillStyle = "white"
          c.textAlign = "left";
            if(this.reverseScore[i]){
            c.fillText(`${game.reverseScore[i]}`, 500, 246+49*(i-5))}}}
      game.drawBack()
    }
  //
  //InGame
    game.drawInGame = function(){
      c.clearRect(0,0,850,550)
      game.drawGenBG()
      game.drawAllFloors()
      game.drawLiveScore()
  /*    game.drawAllItems() */
      game.drawGenCat()

    }
  //
  //EndGame
    game.drawEndGame = function(){
      c.drawImage(egBG, 0, 0, 850, 550)
      
      c.drawImage(egCatGrave, 90,70, 85,80)
      c.drawImage(egCatGrave, 90,405, 85,80)
      c.drawImage(egCatGrave, 668,70, 85,80)
      c.drawImage(egCatGrave, 668,405, 85,80)

      c.drawImage(genButton,290,370,280,55)
      
  
      c.font = "800 28px Patrick Hand";
      c.textAlign = "start";
      c.fillStyle = "#f4c430";
      c.fillText("P  L  A  Y       A  G  A  I  N", 305,408);

      
      c.font = "800 50px Patrick Hand";
      c.fillStyle = "white";
      c.fillText("SCORE:", 215, 318)


      c.font = "400 150px Patrick Hand";
      c.textAlign = "end";
      c.fillText(`${game.score}`, 625, 318)

      game.drawBack()
    }
  //
//

//Game Interface Mapping
  //Mouse Position
    game.canvasXY = canvas.getBoundingClientRect()
    
    game.mouse = function (inputEvt) {
      game.mouseXY = {
          x: inputEvt.clientX - game.canvasXY.left, 
          y: inputEvt.clientY - game.canvasXY.top
      }
    }
  //
  //Load Screens
    //Menu Functions
      game.removeMenuEL = function() {
        canvas.removeEventListener('click', game.play)
        canvas.removeEventListener('click', game.loadIns)
        canvas.removeEventListener('click', game.loadHS)
      }
    //
    //Load Menu (Upon Refresh)
      game.loadMenu = function () {
        canvas.addEventListener('click', game.play)
        canvas.addEventListener('click', game.loadIns)
        canvas.addEventListener('click', game.loadHS)
        game.drawMenu()  
        game.score = 0
        game.clearcdTimer() 
      }
    //
    //Enter Game (Play Button)
      game.play = function(inputEvt) {
        game.mouse(inputEvt)
          if (game.mouseXY.x >240 && game.mouseXY.x<590 && game.mouseXY.y>271 && game.mouseXY.y < 401)   {
            game.removeMenuEL() 
            canvas.addEventListener('click', game.catJump)
            
            game.cat = {x: -50,
                        y: -50,
                        v: 0,
                        g: 0.05,
                        d: 0,
                        f: 0,}
            game.cdTimer()
            game.inGameLoop()
        }
      }
    //
    //INSTRUCTION BUTTON
      game.loadIns = function(inputEvt){ 
        game.mouse(inputEvt)
        if (game.mouseXY.x >220 && game.mouseXY.x<600 && game.mouseXY.y>401 && game.mouseXY.y < 480)   {      
            game.removeMenuEL() 
            game.drawIns()
            canvas.addEventListener('click', game.returnMenu)
            game.clearcdTimer() 
        }
      }
    //
    //HIGH SCORE BUTTON
      game.loadHS = function(inputEvt){ 
        game.mouse(inputEvt)
        if (game.mouseXY.x >0 && game.mouseXY.x<100 && game.mouseXY.y>0 && game.mouseXY.y <100)   {    
            game.removeMenuEL() 
            game.allScores.sort()
            game.allScorecopy = game.allScores.slice(-10,game.allScores.length)
            for(var i = 0;i < 10; i++){
              game.reverseScore.push(game.allScorecopy.pop())
              console.log(game.reverseScore)
            }
            game.drawHS()
            canvas.addEventListener('click', game.returnMenu)
            game.clearcdTimer() 
        }
      }
    //
    //RETURN MENU BUTTON
      game.returnMenu = function(inputEvt) {
        game.mouse(inputEvt)
        if (game.mouseXY.x >0 && game.mouseXY.x<100 && game.mouseXY.y>0 && game.mouseXY.y <100)   {
          canvas.removeEventListener('click', game.returnMenu)
          game.loadMenu()
          game.clearcdTimer() 
        }
      }
    //
    //load In Game
      game.inGameLoop = function(){
        if (game.cat.y<700){  
          game.movements()
          
          game.drawInGame()
          
          window.requestAnimationFrame(game.inGameLoop)
        }
        else {
          game.loadEndGame()
          game.clearcdTimer() 
        }
      }
    //
    //Restart BUTTON
      game.restart = function(inputEvt) {
        game.mouse(inputEvt)
        if (game.mouseXY.x >290 && game.mouseXY.x<570 && game.mouseXY.y>370 && game.mouseXY.y < 425)   {
          game.cat = {x: -50,
                      y: -50,
                      v: 0,
                      g: 0.05,
                      d: 0,
                      f: 0,}
          game.score = 0
          canvas.removeEventListener('click', game.restart)
          canvas.addEventListener('click', game.catJump)
          game.cdTimer()
          game.inGameLoop()
        }
      }
    //
    //EndGame
      game.loadEndGame = function() {
        game.allScores.push(game.score)
        game.score = Math.floor(game.score)
        canvas.removeEventListener('click', game.catJump) 
        game.clearcdTimer() 
               
        game.drawEndGame()        
        canvas.addEventListener('click', game.restart)
        canvas.addEventListener('click', game.returnMenu)
      }
    //
  //  
//

//Initializing Game Function
    function init() {  
      if(!initialized) {
        game.imageArr = loadImages(gameImageSrcArr)
        
         genCat      = game.imageArr[0]
         genButton   = game.imageArr[1]
         genBG       = game.imageArr[2]
         pgBG        = game.imageArr[3]
         pgHS        = game.imageArr[4]
         pgIns       = game.imageArr[5]
         igFloor1    = game.imageArr[6]
         igFloor2    = game.imageArr[7]
         igFloor3    = game.imageArr[8]
         igItem1     = game.imageArr[9]
         igItem2     = game.imageArr[10]
         igItem3     = game.imageArr[11]
         igItem4     = game.imageArr[12]
         igItem5     = game.imageArr[13]
         igItem6     = game.imageArr[14]
         egBG        = game.imageArr[15]
         egCatGrave  = game.imageArr[16]
  
          // Preload
        if (preload) {
          // Add a delay for demonstration purposes -> from internet
            console.log('preloaded')
            setTimeout(function(){initialized = true},1000);
          }
          } 

          console.log('initialized')
         
        setTimeout(game.loadMenu,300)
              
    }
  
//



game.constructFloorObjects()   
//        game.conttructItemObjects()
window.addEventListener("resize", function(){game.canvasXY = canvas.getBoundingClientRect()})

init()

}

Pseudo-Code
// phaser -> JS LIBRARY

/*
  HTML 
      LOBBY 
        CAT ANIMATION LOB
        CAT NAME
        MUSIC (TOGGLE?)
        BACKGROUND
        YOUR BEST SCORE: _
        START GAME BUTTON

      INGAME
        CAT ANIMATION IG
        MUSIC
        BACKGROUND
        FLOOR
        ITEMS
        YOUR SCORE
        BEST SCORE
      
      GAMEPAUSE
        CAT ANIMATION PG 
        RESUME BUTTON
      
      GAME END 
        THIS GAME SCORE:
        BEST SCORE:
        RESTART BUTTON:

*/


/*
  INGAME PROGRESSION
      TIME 0
        UNIVERSE, FLOORS, ITEMS, CAT SHOW ON GAME
          
      AFTER EVERYTHING IS LOADED
        CAT FALLS DOWN FROM TOP LEFT CORNER UNTIL CAT X = 0
        UNIVERSE, FLOORS, AND ITEMS MOVE LEFT @ certain speed
            UNIVERSE LOOP IMAGE
            FLOOR, ITEMS RANDOMLY GENERATED
        CAT POSITION = (0, Y+=D)
          GAIN POINTS
              ITEM X === 0 && ITEM Y === CAT Y
              ITEM DISAPPEAR
          GAME OVER
              CAT Y < -200 UNIT
   
*/

/*
  CAT POSITION AT TIME (T)
    CAT POSITION (CP)
    
    CAT ACCERLATION (CA) AT T
      CA 
        = DOWNWARD ACCELERATION (DA) + UPWARD ACCELERATION (UA) * USER INPUT(UI)
      DA
        = -1 length/(time-square)
      UA 
        = 1 length/(time-square)
  
 
  CAT POSITION AT TIME T+1
    CP += D
   
    DISTANCE (D) 
      D = 1/2(CA) + CVi

            CAT VELOCITY (CV)
              CVi += CA  
    
*/


/*
  FLOORS 
      20 FLOOR SPOTS

      AT A GIVEN X
        10 RANDOMLY FLOORS WITH RANDOMLY GENERATED LENGTH

      DETECT FURTEST X FOR 10 FLOORS
        IF NO 10 FLOORS, RANDOMLY CHOOSE AN EMPTY FLOOR SPOT AND CREATE A FLOOR WITH A RANDOM LENGTH.

*/

/*
  

*/
/*
        
    


    

        
          
    
    
    EVENT LISTEN FOR PLAYER INPUT
        IF CLICKED
            JUMP UP

        (LIMIT JUMPS TO 2X PER _____ UNIT TIME)  



*/

/*
    IF PLAYER PRESS SPACE ONCE
      CAT MOVES UP


  

    CAT STAYS RELATIVELY IN THE SAME VERTICAL SPACE
    CAT SHITS OUT RAINBOW AND ARMS/LEGS MOVE SYNCHRONOUSLY 
    EVERYTIME RIGHT CLICK NYAN CAT JUMPS
    JUMPS CAN ACCUMULATE UP TO 2 JUMPS AND RESET TO 0 WHEN CAT LANDS ON FLOOR
    IF CAT TOUCH ITEMS, POINTS +1;
    IF CAT FALLS, GAME OVER;
    IF PLAYER CLICKS PAUSE, GAME PAUSES;
*/

/*
FLOOR
  ~ 10 FLOORS IN COLUMN
  ~ 3 ROWS IN COLUMNS
  EACH FLOOR CAN SPAWN ANYWHERE WITHIN A TABLE OF A 10*3;
*/

/*
CAT MOVEMENTS
  upwards when space key pressed
  forward and downwards at constant speed



ITEMS


MAP MOVEMENTS
  Background remains the same



RULES
  CLICK TO JUMP
  CLICK 2X TO JUMP HIGHER
  LAND ON PLATFORM 
  AVOID 4 X BAD THINGS
  SCORE TRACKER
  GAME PAUSE
  

  MILK SCORE MULTIPLIER FOR 10 SEC
  ROCKETNYAN CAN CONTROL WITH MOUSE
  BUBBLE NYAN UNLIMITED JUMP AND HIGHER
  MAGNET NYAN MAGNETIZE FOOD
  CRACKNYAN FASTER
  
  */

//--------------------------------------------------------------------//

  /*
  GAME STATE
  
  RENDER FUNCTION() UPDATES WHAT IS IN JAVASCRIPT INTO DOM FOR USER SIDE CLIENT
  NEED TO RENDER ON A TIMER WITH OUR GAME, I THINK
  */

  /*
  CONSTANTS
  const 

  APP STATE VARIABLE
  let gameScreen, universe, floor, cat, items, UA

  CACHED ELEMENT REFERENCE


  EVENT LISTENERS
      lobbyStartButton.
      inGame catUA (anywhere on screen)



  FUNCTION
      function gameLoad () {};
      function gameStart () {
        *insert game start screen display*
        *insert background rotate function*
        setInterval(render(), 1);


      };
      function floorGen() {
        math.random()
      };
      function itemGen() {
        math.floor(math.random()*___)
      };
      function gamePause () {};
      function gameEnd () {};  
      function moveCat() {};
      function scoreChange () {};
      function render() {
        catPos = moveCat();
        score = scoreChange();

        


      };



      

          


GAME PROGRESSION
    gameLoad();




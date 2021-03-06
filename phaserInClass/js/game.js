var game = new Phaser.Game(
                    800, 600, 
                    Phaser.AUTO, '', 
                    { 
                        preload: preload, 
                        create: create, 
                        update: update 
                    }
            );

//game variables
var sprite, group;

//load in game assets
function preload() {
//    game.load.atlasJSONHash('inch', 
//                            'assets/inchy.png', 
///                            'assets/inchy.json')
    game.load.atlasJSONHash('inch',
                            'assets/sprites.png',
                            'assets/sprites.js');
    game.load.image("hairball", "assets/hairball.png")
}

//setup game entities
function create() {
    //protagonist
    sprite = game.add.sprite(0, 0, 'inch');
    sprite.animations.add('idle');
    sprite.animations.play('idle', 60, true);
    sprite.anchor.setTo(.5, 0); //center flip area
    
    //stuff
    group = game.add.group();
    group.create(250,0, "hairball");
    group.create(350,0, "hairball");
}

//game logic, ~30 fps
function update() {
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        sprite.x -= 4; //move left
        sprite.scale.x = -1; //face left
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        sprite.x += 4; //move right
        sprite.scale.x = 1; //face right
    }
    
    //check for collision with hairball
    game.physics.collide(
         sprite, 
         group, 
         collisionHandler, 
         null, 
         this
    );
    
} //end update function

function collisionHandler(protagonist, hairball) {
    hairball.kill();   
}
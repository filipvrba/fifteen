import { PlayingBoard } from './game/playingBoard.js'
import * as constants from './game/constants.js';

/**
 * initRenderer
 */
 const canvas = document.querySelector( 'canvas' );
 const renderer = new TDRenderer( canvas );
 renderer.setSize( window.innerWidth, window.innerHeight );

/**
 * Init scene
 */
const scene = new Scene();
scene.ready();

/**
 * Init Objects
 */
function getGlobalPosition() {

    return new Vector2( renderer.canvas.width / 2,
        renderer.canvas.height / 2 );

}

const playingBoard = new PlayingBoard();
playingBoard.position = getGlobalPosition();
scene.add( playingBoard, constants.BOARD );

/**
 * Resize window
 */
 function resize() {

    renderer.setSize( window.innerWidth, window.innerHeight );
    playingBoard.position = getGlobalPosition();
    scene.updateWorld();
}

/**
 * Tick process
 */
function tick() {

    renderer.render( scene );
    requestAnimationFrame( () => tick() );

}

/**
 * Init
 */
tick();
window.onresize = () => resize();
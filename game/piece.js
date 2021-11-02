import * as constants from './constants.js';
import { PieceLabel } from './pieceLabel.js';

class Piece extends Object2D {

    constructor() {

        super();
        this.clickHandler = () => this.click();

        this.mass = new Vector2( constants.WIDTH_PIECE, constants.WIDTH_PIECE );
        this.isCollideMouse = false;

    }

    ready() {

        window.addEventListener( 'click', this.clickHandler );

        const label = new PieceLabel();
        let labelID = String(this.id + 1);

        if (this.id === constants.PLAYING_BOARD_PIECES - 1) {
            this.color = constants.TRANSPARENT;

            labelID = '';
        }

        this.add(label, labelID)

    }

    draw(renderer = new CanvasRenderingContext2D()) {

        const pos = this.globalPosition;

        renderer.beginPath();
        renderer.rect( pos.x, pos.y, this.mass.x, this.mass.y );
        renderer.fillStyle = this.color;
        renderer.fill();

    }

    input( mousePos ) {

        const originPos = this.globalPosition.clone();
        const endPos = originPos.clone().add( this.mass );

        const isCollide_x = mousePos.x > originPos.x && mousePos.x < endPos.x;
        const isCollide_y = mousePos.y > originPos.y && mousePos.y < endPos.y;

        this.isCollideMouse = isCollide_x && isCollide_y;

    }

    click() {

        if ( !this.isCollideMouse ) return;

        this.emitSignal( { type: 'onClick', id: this.id } );

    }

    free() {

        super.free();
        window.removeEventListener( 'click', this.clickHandler );

    }

}

export { Piece };
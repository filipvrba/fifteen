import * as constants from './constants.js';
import { LabelAnimation } from './components/labelAnimation.js';

class PieceLabel extends Object2D {

    constructor() {

        super();
        
        this.maxWidth = constants.WIDTH_PIECE;
        this.maxHeight = 20;

        this.animation = new LabelAnimation();

    }

    ready() {

        // Fix id name
        if ( this.id.length === 1 ) {

            this.id = `${ this.id }`;

        }

        const halfMass = constants.WIDTH_PIECE * 0.5;
        this.position = new Vector2( halfMass, halfMass + 5 );

        // Add animation to scene.
        this.add( this.animation );

    }

    draw( renderer = new CanvasRenderingContext2D() ) {

        renderer.fillStyle = 'black';
        renderer.font = this.fontStyle( this.maxHeight );
        
        renderer.fillText( this.id, this.globalPosition.x,
            this.globalPosition.y, this.maxWidth);
        renderer.globalCompositeOperation='destination-over';

        // Centered position
        renderer.textAlign = 'center';
        renderer.textBaseline = 'middle'; 

    }
    
    fontStyle( size ) {

        return `bold ${ Math.abs( size ) * 3 }px Arial`;

    }

}

export { PieceLabel };
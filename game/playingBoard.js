import { Piece } from './piece.js';
import * as cons from './constants.js';
import { Logic, State, Matrix } from './objects.js';

class PlayingBoard extends Object2D {

    constructor() {

        super();
        this.pieceClickHandler = ( signal ) => this.pieceClick( signal.id );

        this.matrix = new Matrix();

        this.colorStart = new Color( { r: 0, g: 63, b: 92 } );
        this.colorEnd = new Color( { r: 255, g: 166, b: 0 } );

        this.logic = new Logic();
        this.state = new State();

    }

    ready() {

        this.add( this.state, cons.STATE );
        this.add( this.matrix, cons.MATRIX );
        this.add( this.logic, cons.LOGIC );

        this.createPieces();
    }

    createPieces() {

        const piecesLength = cons.PLAYING_BOARD_PIECES - 1;
        for ( let i = 0; i <= piecesLength; i++ ) {

            const piece = new Piece();
            piece.position = this.matrix.get()[ i ];
            piece.color = this.gradientColor( i, piecesLength );
            this.add( piece, i );

            piece.connect( 'onClick', this.pieceClickHandler );

        }

    }

    gradientColor( i, piecesLength ) {

        let alpha = i / ( piecesLength );
        if ( !alpha )
            alpha = 0;

        const color = this.colorStart.lerp( this.colorEnd, alpha );
        return color.toString();

    }

    pieceClick( id ) {

        this.state.emitSignal({ type: 'pieceClick', id });
        this.logic.emitSignal({ type: 'movePieces' });

    }

    free() {

        super.free();
    }

}

export { PlayingBoard };
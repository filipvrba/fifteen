import { Piece } from './piece.js';
import { PLAYING_BOARD_PIECES, WIDTH_PIECE } from './constants.js';
import { Logic } from './components/logic.js';
import { State } from './components/state.js';

class PlayingBoard extends Object2D {

    constructor() {

        super();
        this.pieceClickHandler = ( signal ) => this.pieceClick( signal.id );

        this.matrix = this.getMatrix();

        this.colorStart = new Color( { r: 0, g: 63, b: 92 } );
        this.colorEnd = new Color( { r: 255, g: 166, b: 0 } );

        this.logic = new Logic();
        this.state = new State();

    }

    ready() {

        this.createPieces();

        this.add( this.state, 'state' );
        this.add( this.logic );

    }

    createPieces() {

        const piecesLength = PLAYING_BOARD_PIECES - 1;
        for ( let i = 0; i <= piecesLength; i++ ) {

            const piece = new Piece();
            piece.position = this.matrix[ i ];
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

    getMatrix() {

        const left = -( WIDTH_PIECE * 2 );
        const leftMiddle = -WIDTH_PIECE;
        const rightMiddle = 0;
        const right = WIDTH_PIECE;

        return [
            new Vector2( left, left ),
            new Vector2( leftMiddle, left ),
            new Vector2( rightMiddle, left ),
            new Vector2( right, left ),

            new Vector2( left, leftMiddle ),
            new Vector2( leftMiddle, leftMiddle ),
            new Vector2( rightMiddle, leftMiddle ),
            new Vector2( right, leftMiddle ),

            new Vector2( left, rightMiddle ),
            new Vector2( leftMiddle, rightMiddle ),
            new Vector2( rightMiddle, rightMiddle ),
            new Vector2( right, rightMiddle ),

            new Vector2( left, right ),
            new Vector2( leftMiddle, right ),
            new Vector2( rightMiddle, right ),
            new Vector2( right, right )
        ];

    }

    pieceClick( id ) {

        this.state.emitSignal({ type: 'pieceClick', id });

    }

    free() {

        super.free();
        piece.disconect( 'onClick', this.pieceClickHandler );

    }

}

export { PlayingBoard };
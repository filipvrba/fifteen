import * as constants from '../constants.js';

class State extends BasicObject {

    constructor() {

        super();
        this.pieceClickHandler = (signal) => this.pieceClick( signal.id );

        this.solution = new Map();
        this.pieceClicked = null;
        this.pieceLast = null;

    }

    ready() {

        this.initSolution();
        this.connect( 'pieceClick', this.pieceClickHandler );

    }

    initSolution() {

        for ( let i = 0; i < constants.PLAYING_BOARD_PIECES; i++ ) {

            const piece = this.parent.findChildren( i );
            this.solution.set( i, piece.position );

        }

    }

    pieceClick( id ) {

        this.pieceClicked = this.parent.findChildren( id );
        this.pieceLast = this.parent.findChildren(
            constants.PLAYING_BOARD_PIECES - 1 );
        
        this.emitSignal({ type: 'movePieces' });

    }

    free() {

        super.free();
        this.disconect( 'pieceClick', this.pieceClickHandler );

    }

}

export { State };
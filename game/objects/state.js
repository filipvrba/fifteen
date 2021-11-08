import * as constants from '../constants.js';

class State extends BasicObject {

    constructor() {

        super();
        this.pieceClickHandler = (signal) => this.pieceClick( signal.id );
        this.readyHandler = (signal) => this.readyObject( signal.id );
        this.updateMatrixHandler = (signal) => this.updateSolution( signal.idNext, signal.idOrig );

        this.solution = [ ];
        this.pieceClicked = null;
        this.pieceLast = null;
        this.logic = null;  // Initialize from ready function                [ 0 ]
        this.matrix = null;  // Initialize from ready function               [ 1 ]
    }

    ready() {

        // this.initSolution();
        this.connect( 'pieceClick', this.pieceClickHandler );
        this.getScene().connect( 'ready', this.readyHandler );
    }

    readyObject( id ) {

        if ( id === constants.LOGIC ) {

            this.logic = this.parent.findChildren( constants.LOGIC );   //   [ 0 ]
            this.logic.connect( constants.UPDATE_MATRIX, this.updateMatrixHandler );

        } else if ( id === constants.MATRIX ) {

            this.matrix = this.parent.findChildren( constants.MATRIX );  //  [ 1 ]
            this.solution = this.matrix.get();
        }
    }

    getPieceClicked() {

        return this.pieceClicked;
    }

    getPieceLast() {

        return this.pieceLast;
    }

    pieceClick( id ) {

        this.pieceClicked = this.parent.findChildren( id );
        this.pieceLast = this.parent.findChildren(
            constants.PLAYING_BOARD_PIECES - 1 );

    }

    changePosition(arr, from, to) {

        arr.splice(to, 0, arr.splice(from, 1)[0]);
        return arr;
    }

    updateSolution( idNext, idOrig ) {

        console.log( idOrig, idNext );
        this.solution = this.changePosition( this.solution, idOrig, idNext );
    }

    free() {

        super.free();
        this.disconect( 'pieceClick', this.pieceClickHandler );
        this.getScene().disconect( 'ready', this.readyHandler );
        this.logic.disconect( constants.UPDATE_MATRIX, this.updateMatrixHandler );
    }

}

export { State };
import * as constants from '../constants.js';

class Logic extends BasicObject {

    constructor() {

        super();
        this.movePiecesHandler = () => this.movePieces();

        this.state = null;

    }

    ready() {

        this.state = this.parent.findChildren( 'state' );
        this.state.connect( 'movePieces', this.movePiecesHandler );

    }

    movePieces() {

        if ( true ) {

            

        }

    }

    free() {

        super.free();
        this.state.disconect( 'movePieces', this.movePiecesHandler );

    }

}

export { Logic };
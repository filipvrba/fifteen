import * as constants from '../constants.js';
import { StateComponent } from '../components.js';

class Logic extends BasicObject {

    constructor() {

        super();
        this.movePiecesHandler = () => this.movePieces();

        this.state = new StateComponent();
        this.matrix = null;  // Initialize from ready function         [ 0 ]
    }
    ready() {

        this.connect('movePieces', this.movePiecesHandler);

        this.add( this.state );
        this.matrix = this.parent.findChildren( constants.MATRIX ); // [ 0 ]
    }

    movePieces() {

        if (this.isSourcePath) {

            this.directionState( this.getDirection() );
        }

    }

    getDirection() {

        if ( this.state === null ) return null;

        const piecePosition = this.state.getClickGlobPosition();
        const lastPosition = this.state.getSourceGlobPosition();
        return lastPosition.sub( piecePosition ).normalized();
    }

    directionState( direction ) {

        const normal = 1;

        if ( direction.y === normal ) {

            this.directionY();

        } else if ( direction.x === normal ) {

            this.directionX();
        }
    }

    directionX() {

        const { matrixID, matrixID_last } = this.matrix.getIDs();
        const nextID = matrixID + 1;
        const distance = matrixID_last - matrixID;

        this.getUpdateMatrix( distance, `${ matrixID } + i`, `${ nextID } + i` );
    }

    directionY() {

        const { matrixID, matrixID_last } = this.matrix.getIDs();
        const numberAdd = this.matrix.compareNumber( '2 ** i', constants.PLAYING_BOARD_PIECES );
        const nextID = matrixID + numberAdd;
        const distance = this.matrix.compareNumber(
            `${ matrixID } + i`, matrixID_last ) / numberAdd;
        
        this.getUpdateMatrix( distance, `${ matrixID } + ( ${ numberAdd } * i )`,
            `${ nextID } + ( ${ numberAdd } * i )`);
    }

    getUpdateMatrix( lengthLoop, origID, nextID ) {

        for ( let i = 0; i < lengthLoop; i++ ) {

            const id_next = eval( nextID );
            const id_orig = eval( origID )

            console.log( id_orig, id_next );
        }
    }

    free() {

        super.free();
        this.disconect('movePieces', this.movePiecesHandler);

    }

    get isSourcePath() {

        const isPath_x = this.state.clickPosition.x === this.state.sourcePosition.x;
        const isPath_y = this.state.clickPosition.y === this.state.sourcePosition.y;

        return isPath_x || isPath_y;

    }
}

export { Logic };
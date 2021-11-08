import { StateComponent } from '../components.js';
import { WIDTH_PIECE } from '../constants.js';

class Matrix extends BasicObject {

    constructor() {

        super();

        this.state = new StateComponent();
        this.maxCompare = 32;
    }

    ready() {

        this.add( this.state );
    }

    get() {

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

    findID( position ) {

        const isExist = (element) => {

            return element.equals( position.x, position.y );
        };
        return this.get().findIndex( isExist );
    }

    getID() {
        
        return this.findID( this.state.clickPosition );
    }

    getIDLast() {

        return this.findID( this.state.sourcePosition );
    }

    getIDs() {

        const matrixID = this.getID();
        const matrixID_last = this.getIDLast();
        
        return { matrixID, matrixID_last };
    }

    compareNumber( compare, number ) {

        for ( let i = 0; i < this.maxCompare; i++ ) {

            if ( number === eval( compare ) ) {

                return i;
            }
        }
    }
}

export { Matrix };
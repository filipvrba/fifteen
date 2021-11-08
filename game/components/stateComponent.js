/**
 * Testing write this component.
 */

import * as constants from '../constants.js';

class StateComponent extends BasicObject {

    constructor() {

        super();
    }

    ready() {

        this.state = this.getScene()
            .findChildren( constants.BOARD )
            .findChildren( constants.STATE );
    }

    get clickPosition() {

        return this.state.getPieceClicked().position;

    }

    get sourcePosition() {

        return this.state.getPieceLast().position;

    }

    getClickGlobPosition() {

        return this.state.getPieceClicked().globalPosition.clone();

    }

    getSourceGlobPosition() {

        return this.state.getPieceLast().globalPosition.clone();

    }
}

export { StateComponent };
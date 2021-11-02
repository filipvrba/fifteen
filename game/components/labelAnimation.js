class LabelAnimation extends BasicObject {

    constructor() {

        super();

        this.animationPlayer = new AnimationPlayer();
        this.onCollide = false;

    }

    ready() {

        this.add( this.animationPlayer );
        this.createAnimation();

    }

    update( dt ) {

        const piece = this.parent.parent;

        if ( piece.isCollideMouse ) {

            if ( !this.onCollide ) {

                this.onCollide = true;
                this.playStrong();
            }

        } else {

            if ( this.onCollide ) {

                this.onCollide = false;
                this.playLight();

            }

        }

    }

    createAnimation() {

        const parentHeight = this.parent.maxHeight;
        const maxHeight = parentHeight + 5;
        const valueName = 'parent.maxHeight';
        const endTime = 0.1

        /**
         * Strong
         */
        let animation = new Animation();
        let trackID = animation.addTrack( valueName );
        animation.addInsertKey( trackID, 0, parentHeight );
        animation.addInsertKey( trackID, endTime, maxHeight );

        this.animationPlayer.addAnimation( 'strong', animation );

        /**
         * Light
         */
        animation = new Animation();
        trackID = animation.addTrack( valueName );
        animation.addInsertKey( trackID, 0, maxHeight );
        animation.addInsertKey( trackID, endTime, parentHeight );

        this.animationPlayer.addAnimation( 'light', animation );

    }

    playStrong() {

        this.animationPlayer.play( 'strong' );

    }

    playLight() {

        this.animationPlayer.play( 'light' );

    }

}

export { LabelAnimation };
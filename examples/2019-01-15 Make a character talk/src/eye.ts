import { Sprite, Texture, BaseTexture, Rectangle, Container } from "pixi.js";

import eye from "./eyes.png";
import pupil from "./pupil.png";

export enum EyePosition {
    LEFT,
    RIGHT
}

export enum LookingDirection {
    UP,
    UP_LEFT,
    UP_RIGHT,
    RIGHT,
    DOWN,
    DOWN_LEFT,
    DOWN_RIGHT,
    LEFT,
    FORWARD
}

export enum Mood {
    NEUTRAL,
    ANGRY,
    SAD,
    BORED,
    EXCITED
}

export class Eye extends Container {
    private _eyeBall = this.addChild(new Sprite(new Texture(BaseTexture.fromImage(eye))));
    private _pupil = this.addChild(new Sprite(new Texture(BaseTexture.fromImage(pupil))));

    /**
     * Position of the eye on the face
     */
    private _eyePosition : EyePosition = EyePosition.LEFT;
    public get eyePosition() : EyePosition {
        return this._eyePosition;
    }
    public set eyePosition(eyePosition: EyePosition) {
        this._eyePosition = eyePosition;

        if (this._eyePosition === EyePosition.RIGHT && this._eyeBall.scale.x > 0) {
            this._eyeBall.scale.x *= -1;
        }

    }

    /**
     * The direction this eye is looking at
     */
    private _lookingDirection : LookingDirection = LookingDirection.FORWARD;
    public get lookingDirection(): LookingDirection {
        return this._lookingDirection;
    }
    public set lookingDirection(lookingDirection: LookingDirection) {
        this._lookingDirection = lookingDirection;

        switch (this._lookingDirection) {
            case LookingDirection.UP:
                this._pupil.position.set(0, -15);
                break;
            case LookingDirection.UP_LEFT:
                this._pupil.position.set(-10, -15);
                break;
            case LookingDirection.UP_RIGHT:
                this._pupil.position.set(10, -15);
                break;
            case LookingDirection.RIGHT:
                this._pupil.position.set(15, 0);
                break;
            case LookingDirection.DOWN:
                this._pupil.position.set(0, 15);
                break;
            case LookingDirection.DOWN_LEFT:
                this._pupil.position.set(-10, 15);
                break;
            case LookingDirection.DOWN_RIGHT:
                this._pupil.position.set(10, 15);
                break;
            case LookingDirection.LEFT:
                this._pupil.position.set(-15, 0);
                break;
            case LookingDirection.FORWARD:
                this._pupil.position.set(0, 0);
                break;
        }
    }

    /**
     * Whether this eye is open
     */
    private _open : boolean = true;
    public get open(): boolean {
        return this._open;
    }
    public set open(open: boolean) {
        if (this._eyeBall.texture.baseTexture.hasLoaded) {
            this._open = open;

            if (this._open) {
                this.mood = this._mood;
                this._pupil.visible = true;
            } else {
                this._eyeBall.texture.frame = new Rectangle(640, 0, 128, 128);
                this._pupil.visible = false;
            }
        }
    }

    /**
     * The mood this eye reflects
     */
    private _mood : Mood = Mood.NEUTRAL;
    public get mood(): Mood {
        return this._mood;
    }
    public set mood(mood: Mood) {

        if (this._eyeBall.texture.baseTexture.hasLoaded) {
            this._mood = mood;

            switch (this._mood) {
                default:
                case Mood.NEUTRAL:
                    this._eyeBall.texture.frame = new Rectangle(0, 0, 128, 128);
                    break;
                case Mood.ANGRY:
                    this._eyeBall.texture.frame = new Rectangle(128, 0, 128, 128);
                    break;
                case Mood.SAD:
                    this._eyeBall.texture.frame = new Rectangle(256, 0, 128, 128);
                    break;
                case Mood.BORED:
                    this._eyeBall.texture.frame = new Rectangle(384, 0, 128, 128);
                    break;
                case Mood.EXCITED:
                    this._eyeBall.texture.frame = new Rectangle(512, 0, 128, 128);
                    break;
            }
        }
    }

    constructor() {
        super();

        this._eyeBall.scale.set(.6);
        this._eyeBall.anchor.set(.5);
        this._pupil.anchor.set(.5);

        this._eyeBall.texture.baseTexture.on('loaded', () => {
            this._eyeBall.texture.frame = new Rectangle(0, 0, 128, 128);
        });
    }
}
import { Container } from "pixi.js";
import { Eye, EyePosition, LookingDirection, Mood } from "./eye";
import { Mouth } from "./mouth";

export class Face extends Container {
    public readonly leftEye = this.addChild(new Eye());
    public readonly rightEye = this.addChild(new Eye());
    public readonly mouth = this.addChild(new Mouth());

    /**
     * The direction this face is looking at
     */
    private _lookingDirection: LookingDirection = LookingDirection.FORWARD;
    public get lookingDirection(): LookingDirection {
        return this._lookingDirection;
    }
    public set lookingDirection(lookingDirection: LookingDirection) {
        this._lookingDirection = lookingDirection;

        this.leftEye.lookingDirection = this._lookingDirection;
        this.rightEye.lookingDirection = this._lookingDirection;
    }

    /**
     * Whether this face's eyes are open
     */
    private _eyesOpen: boolean = true;
    public get eyesOpen(): boolean {
        return this._eyesOpen;
    }
    public set eyesOpen(eyesOpen: boolean) {
        this._eyesOpen = eyesOpen;

        this.leftEye.open = this._eyesOpen;
        this.rightEye.open = this._eyesOpen;
    }

    /**
     * The mood this face displays
     */
    private _mood: Mood = Mood.NEUTRAL;
    public get mood(): Mood {
        return this._mood;
    }
    public set mood(mood: Mood) {
        this._mood = mood;

        this.leftEye.mood = this._mood;
        this.rightEye.mood = this._mood;
    }

    /**
     * Constructor
     */
    constructor() {
        super();

        this.leftEye.eyePosition = EyePosition.LEFT;
        this.rightEye.eyePosition = EyePosition.RIGHT;
    }

    public *blink(): IterableIterator<void> {
        while (true) {
            const frames = Math.round(Math.random() * 300);

            for(let i = 0; i < frames; i++) {
                yield;
            }

            this.eyesOpen = false;

            yield;
            yield;
            yield;

            this.eyesOpen = true;
        }
    }
}
import { Sprite, Texture, BaseTexture, Rectangle } from "pixi.js";

import mouth from "./mouth.png";

export type Phoneme = 'mm' | 'ee' | 'oo' | 'wf' | 'aa' | 'uu' | 'ld' | 'nn';

export class Mouth extends Sprite {
    private _phoneme : Phoneme = 'mm';
    public get phoneme(): Phoneme {
        return this._phoneme;
    }
    public set phoneme(phoneme: Phoneme) {
        if (this.texture.baseTexture.hasLoaded) {
            this._phoneme = phoneme;

            switch (this._phoneme) {
                default:
                case 'mm':
                    this.texture.frame = new Rectangle(0, 0, 128, 128);
                    break;
                case 'ee':
                    this.texture.frame = new Rectangle(128, 0, 128, 128);
                    break;
                case 'oo':
                    this.texture.frame = new Rectangle(256, 0, 128, 128);
                    break;
                case 'wf':
                    this.texture.frame = new Rectangle(384, 0, 128, 128);
                    break;
                case 'aa':
                    this.texture.frame = new Rectangle(512, 0, 128, 128);
                    break;
                case 'uu':
                    this.texture.frame = new Rectangle(640, 0, 128, 128);
                    break;
                case 'ld':
                    this.texture.frame = new Rectangle(768, 0, 128, 128);
                    break;
                case 'nn':
                    this.texture.frame = new Rectangle(896, 0, 128, 128);
                    break;

            }
        }
    }

    constructor() {
        super(new Texture(BaseTexture.fromImage(mouth)));

        this.anchor.set(.5);
        this.texture.baseTexture.on('loaded', () => {
            this.texture.frame = new Rectangle(0, 0, 128, 128);
        });
    }

    public *saySyllable(syllable: string): IterableIterator<void> {
        switch (true) {
            default:
            case syllable.startsWith('b'):
            case syllable.startsWith('m'):
            case syllable.startsWith('p'):
                this.phoneme = 'mm';
                break;

            case syllable.startsWith('d'):
            case syllable.startsWith('l'):
                this.phoneme = 'ld';
                break;

            case syllable.startsWith('f'):
            case syllable.startsWith('v'):
            case syllable.startsWith('w'):
                this.phoneme = 'wf';
                break;

            case syllable.startsWith('g'):
            case syllable.startsWith('k'):
            case syllable.startsWith('j'):
            case syllable.startsWith('h'):
            case syllable.startsWith('n'):
            case syllable.startsWith('q'):
            case syllable.startsWith('t'):
            case syllable.startsWith('x'):
                this.phoneme = 'nn';
                break;

            case syllable.startsWith('c'):
            case syllable.startsWith('s'):
            case syllable.startsWith('z'):
            case syllable.startsWith('e'):
                this.phoneme = 'ee';
                break;

            case syllable.startsWith('a'):
            case syllable.startsWith('i'):
            case syllable.startsWith('r'):
                this.phoneme = 'aa';
                break;

            case syllable.startsWith('o'):
                this.phoneme = 'oo';
                break;

            case syllable.startsWith('u'):
            case syllable.startsWith('y'):
                this.phoneme = 'uu';
                break;
        }

        yield;
        yield;
        yield;

        switch (true) {
            case syllable.includes('e'):
                this.phoneme = 'ee';
                break;

            case syllable.includes('a'):
            case syllable.includes('i'):
                this.phoneme = 'aa';
                break;

            case syllable.includes('o'):
                this.phoneme = 'oo';
                break;

            case syllable.includes('u'):
                this.phoneme = 'uu';
                break;
        }

        yield;
        yield;
        yield;
    }

    public *sayWord(word: string): IterableIterator<void> {
        const syllables = word.match(/.{1,3}/g);

        if (syllables !== null) {
            for (const syllable of syllables) {
                yield* this.saySyllable(syllable);
            }
        }

        yield;
        yield;
        yield;

        this.phoneme = 'mm';
    }

    public *sayPhrase(phrase: string): IterableIterator<void> {
        for(const word of phrase.split(' ')) {
            yield* this.sayWord(word);
        }

        this.phoneme = 'mm';
    }
}
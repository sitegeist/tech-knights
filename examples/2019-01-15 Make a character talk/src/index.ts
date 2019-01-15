import "./settings"
import { Application, Sprite, Rectangle } from "pixi.js";

import einstein from "./einstein.png";
import { Face } from "./face";
import { LookingDirection, Mood } from "./eye";

const application = new Application({
    width: 800,
    height: 600
});

const sprite = Sprite.fromImage(einstein);

sprite.anchor.set(1, 1);
sprite.position.set(800, 600);

application.stage.addChild(sprite);

const face = application.stage.addChild(new Face());

face.position.set(460, 200);
face.leftEye.position.set(0, 4);
face.rightEye.position.set(80, -7);
face.mouth.position.set(60, 108);

face.lookingDirection = LookingDirection.FORWARD;
face.eyesOpen = true;

setTimeout(() => {
    face.mood = Mood.NEUTRAL;
}, 200);

const view = document.getElementById('app');
if (view !== null) {
    view.appendChild(application.view);
}

application.ticker.add(face.blink().next);

const button = document.getElementById('speak');
const input = <HTMLInputElement>document.getElementById('text');
if (button !== null && input !== null) {
    button.addEventListener('click', () => {
        const msg = new SpeechSynthesisUtterance();
        msg.rate = .8;
        msg.text = input.value;

        application.ticker.add(face.mouth.sayPhrase(input.value).next);
        window.speechSynthesis.speak(msg);
    })
}






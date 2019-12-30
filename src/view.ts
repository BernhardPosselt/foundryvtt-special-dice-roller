import {getDieImage} from './images';
import {Roll} from './roller';

export class DieRollView<D, F> {
    public die: D;
    public face: F;
    public imageName: string;

    constructor(
        roll: Roll<D, F>,
        images: Map<D, Map<F, string>>,
    ) {
        this.die = roll.die;
        this.face = roll.face;
        this.imageName = getDieImage(images, this.die, this.face);
    }
}

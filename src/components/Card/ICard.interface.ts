import type { Amount } from './Enum/Amount.enum';
import type { Filling } from './Enum/Filling.enum';
import type { Color } from './Enum/Color.enum';
import type { Shape } from './Enum/Shape.enum';

export interface ICard {
    color: Color,
    amount: Amount,
    filling: Filling,
    shape: Shape,
    active: boolean,
}
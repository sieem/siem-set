import type { Amount } from './Enum/amount.enum';
import type { Filling } from './Enum/filling.enum';
import type { Color } from './Enum/color.enum';
import type { Shape } from './Enum/shape.enum';

export interface ICard {
    color: Color,
    amount: Amount,
    filling: Filling,
    shape: Shape
}
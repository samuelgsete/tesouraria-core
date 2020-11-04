import { Recipe } from "./recipe.entity";
import { EntityBase } from "./entity-base.entity";
import { StatusType } from "./enums/status-type.enum";
export declare class Credit extends EntityBase {
    holder: string;
    value: number;
    telephone: string;
    registeredIn: Date;
    status: StatusType;
    recipe: Recipe;
    constructor(values?: Object);
}

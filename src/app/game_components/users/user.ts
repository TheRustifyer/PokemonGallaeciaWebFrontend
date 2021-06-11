import { Trainer } from "../trainer/trainer";

export class User {
    id!: number;

    username!: string;
    password!: string;
    email!: string;

    name!: string;
    lastName!: string;
    accountCreationDate!: string;

    trainer!: Trainer;
}

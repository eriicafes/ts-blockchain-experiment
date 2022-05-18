export interface ITransaction {
    sender: string
    receiver: string
    amount: number
}

export class Transaction implements ITransaction {
    constructor(
        public sender: string,
        public receiver: string,
        public amount: number,
    ) { }
}
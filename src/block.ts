import { Blockchain } from "./blockchain"
import { createHash } from "./hash"
import { ITransaction } from "./transaction"

export interface IBlock {
    index: number
    nonce: number
    key: string
    transations: ITransaction[]
    previousHash: string
    hash: string
    addTransaction(transaction: ITransaction): void
    generateHash(): string
}

export class Block implements IBlock {
    public hash: string
    public nonce: number = 0

    constructor(
        public index: number,
        public transations: ITransaction[],
        public previousHash: string,
    ) {
        this.hash = this.generateHash()
    }

    public get key(): string {
        return JSON.stringify(this.transations) + this.index + this.nonce + this.previousHash
    }

    public addTransaction(transaction: ITransaction): void {
        this.transations.push(transaction)
    }

    public generateHash(): string {
        let hash = createHash(this.key)

        while (!hash.startsWith(Blockchain.HashPrefix)) {
            console.log("hashing:", this.nonce, hash, this.key)
            hash = createHash(this.key)
            this.nonce++
        }

        return hash
    }
}
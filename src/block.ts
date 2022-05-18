import { Blockchain } from "./blockchain"
import { createHash } from "./hash"

export interface IBlock<T> {
    index: number
    nonce: number
    key: string
    transations: T[]
    previousHash: string
    hash: string
    addTransaction(transaction: T): void
    generateHash(): string
}

export class Block<T> implements IBlock<T> {
    public hash: string
    public nonce: number = 0

    constructor(
        public index: number,
        public transations: T[],
        public previousHash: string,
    ) {
        this.hash = this.generateHash()
    }

    public get key(): string {
        return JSON.stringify(this.transations) + this.index + this.nonce + this.previousHash
    }

    public addTransaction(transaction: T): void {
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
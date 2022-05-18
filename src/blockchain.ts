import { Block, IBlock } from "./block";

export interface IBlockchain<T> {
    blocks: IBlock<T>[]
    getPreviousBlock(): IBlock<T>
    addBlock(transactions: T[]): void
}

export class Blockchain<T> implements IBlockchain<T> {
    public static HashPrefix = "deb" // "0x64"

    public static create<T>(): IBlockchain<T> {
        const genesisBlock = new Block(0, [], "0000000000")

        return new Blockchain(genesisBlock)
    }

    public blocks: IBlock<T>[]

    private constructor(genesisBlock: IBlock<T>) {
        this.blocks = [genesisBlock]
    }

    public getPreviousBlock(): IBlock<T> {
        return this.blocks[this.blocks.length - 1]
    }

    public addBlock(transactions: T[]): void {
        const previousBlock = this.getPreviousBlock()

        const block = new Block(previousBlock.index + 1, transactions, previousBlock.hash)

        this.blocks.push(block)
    }
}
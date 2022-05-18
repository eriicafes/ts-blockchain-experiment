import { Block, IBlock } from "./block";
import { ITransaction } from "./transaction";

export interface IBlockchain {
    blocks: IBlock[]
    getPreviousBlock(): IBlock
    addBlock(transactions: ITransaction[]): void
}

export class Blockchain implements IBlockchain {
    public static HashPrefix = "deb" // "0x64"

    public static create(): IBlockchain {
        const genesisBlock = new Block(0, [], "0000000000")

        return new Blockchain(genesisBlock)
    }

    public blocks: IBlock[]

    private constructor(genesisBlock: IBlock) {
        this.blocks = [genesisBlock]
    }

    public getPreviousBlock(): IBlock {
        return this.blocks[this.blocks.length - 1]
    }

    public addBlock(transactions: ITransaction[]): void {
        const previousBlock = this.getPreviousBlock()

        const block = new Block(previousBlock.index + 1, transactions, previousBlock.hash)

        this.blocks.push(block)
    }
}
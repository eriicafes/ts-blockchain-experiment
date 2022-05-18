import { Blockchain } from "./blockchain";
import { Transaction } from "./transaction";

const blockchain = Blockchain.create()

const users = ["tom", "andrew", "jenner", "kate"]

const userTransactions: Transaction[][] = users.map(sender => {
    return users
        // get all users except current user
        .filter(u => u !== sender)
        // generate random transaction for this user to all other users
        .map(receiver => new Transaction(sender, receiver, Math.random() * 1000))
})

console.log("user transactions:", userTransactions)

for (let transactions of userTransactions) {
    blockchain.addBlock(transactions)
}

console.log(blockchain)
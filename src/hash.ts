import crypto from "crypto"

export function createHash(payload: string): string {
    const hash = crypto.createHash("sha256")

    return hash.update(payload).digest("hex")
}
import * as z from 'zod';


export const SigninSchema = z.object({
    publicAddress: z.string().min(42, 'It is not a valid Ethereum address'),
    signedNonce: z.string().min(64, 'Nonce must be 64 characters long'),
});
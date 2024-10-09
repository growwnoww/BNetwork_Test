import {z} from 'zod'

export const registrationSchema = z.object({
    newuser_address: z
      .string()
      .length(42, "Wallet address must be exactly 42 characters long")
      .refine(
        (val) => /^0x[a-fA-F0-9]{40}$/.test(val),
        "Invalid Ethereum wallet address format"
      ),
    referral_address: z
    .string()
      .length(42, "Referral address must be exactly 42 characters long")
      .refine(
        (val) => /^0x[a-fA-F0-9]{40}$/.test(val),
        "Invalid Ethereum wallet address format"
      )
  });
  
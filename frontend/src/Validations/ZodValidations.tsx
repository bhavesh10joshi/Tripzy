import { z } from "zod"

export const Validations = z.object({
   email : z.string().includes("@") ,
   Password : z.string().min(10).regex(/[0-9]/) 
});


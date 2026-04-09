import { z } from "zod";

export const addScreenSchema = z.object({
   screen_number: z.string(),
   screen_type: z.enum(['2D','3D','IMAX']),
   capacity: z.number()
}).strict();

export type addtheaterScreenInput = z.infer< typeof addScreenSchema>
import { z } from "zod";

export const editScreenSchema = z.object({
    screen_number: z.string(),
    screen_type: z.enum(['2D','3D','IMAX']),
    capacity: z.number()
}).strict().partial();

export type edittheaterScreenInput = z.infer< typeof editScreenSchema>
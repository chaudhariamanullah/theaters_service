import { z } from "zod";

export const addTheaterSchema = z.object({
    theater_name: z.string().min(3),
    theater_country: z.string(),
    theater_city: z.string(),
    theater_address: z.string(),
    theater_status: z.string()
}).strict();

export type addTheaterInput = z.infer< typeof addTheaterSchema > & {
  theater_image?: string | undefined;
};
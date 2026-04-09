import { z } from "zod";

export const editTheaterSchema = z.object({
    theater_name: z.string().min(3).optional(),
    theater_country: z.string().optional(),
    theater_city: z.string().optional(),
    theater_address: z.string().optional(),
    theater_status: z.string().optional()
}).strict();

export type editTheaterInput = z.infer<typeof editTheaterSchema> & {
  theater_image?: string;
};
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),                             // ID as a string
  bn_id: z.string(),   
  address:z.string()        ,               // BN ID as a string
  date_time: z.string(),           // Ensure this is a string in a valid datetime format
  directTeam: z.number().int().min(0),        // Ensure directTeam is an integer and non-negative
  totalTeam: z.number().int().min(0),         // Ensure totalTeam is an integer and non-negative
  status: z.enum(["Active", "Inactive"]),     // Status should be one of the predefined options
  label: z.string().optional(),               // Label as a string, optional if not always present
  priority: z.string().optional(),            // Priority as a string, optional
});

export type Task = z.infer<typeof taskSchema>;

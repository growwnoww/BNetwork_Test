import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const earningType = {
    levelearning:"levelearning",
    directearning:"directearning",
    upgradeearning:"upgradeearning"
}
export const taskSchema = z.object({
  id: z.string(),                          
  bn_id: z.string(),   
  address:z.string(),
  currentPlanet:z.string(),          
  date_time: z.string(), 
  earnType:z.enum([earningType.directearning,earningType.levelearning,earningType.upgradeearning]),
  earningAmount:z.string(),
  label: z.string().optional(),              
  priority: z.string().optional(),           
});

export type Task = z.infer<typeof taskSchema>;

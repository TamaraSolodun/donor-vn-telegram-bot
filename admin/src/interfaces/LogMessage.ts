import { z } from 'zod';

export const logMessageSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  surname: z.string(),
  success: z.boolean(),
  timestamp: z.date(),
  message: z.string(),
  messageType: z.string(),
  messageProps: z.object({
    bloodGroup: z.string(),
    dateOfNextDonation: z.string(),
  })
});

export const logMessageListSchema = z.array(logMessageSchema);

export type LogMessage = z.infer<typeof logMessageSchema>;

export type LogMessageList = z.infer<typeof logMessageListSchema>;

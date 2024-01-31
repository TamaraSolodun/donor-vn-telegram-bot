import { z } from 'zod';

const donorSchema = z.object({
  userId: z.number().int().positive(), 
  username: z.string(),
  phoneNumber: z.string(),
  firstName: z.string(),
  surname: z.string(),
  dateOfBirth: z.string().nullable(), 
  sex: z.string().nullable(), 
  height: z.number().nullable(), 
  weight: z.number().nullable(), 
  bloodType: z.string().nullable(), 
  rhesusFactor: z.string().nullable(), 
  city: z.string().nullable(), 
});

export type Donor = z.infer<typeof donorSchema>;

export { donorSchema };

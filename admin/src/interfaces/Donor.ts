import { z } from 'zod';

export const donorSchema = z.object({
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
  dateOfLastDonation: z.string().nullable(),
  dateOfNextDonation: z.string().nullable(),
  countOfDonations: z.number().nullable(),
});

export const donorListSchema = z.array(donorSchema);

export type Donor = z.infer<typeof donorSchema>;

export type DonorList = z.infer<typeof donorListSchema>;

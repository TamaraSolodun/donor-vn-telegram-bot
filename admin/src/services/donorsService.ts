<<<<<<< HEAD
import { Donor, DonorList, donorListSchema, donorSchema } from "../interfaces/Donor";

const apiUrl = "http://localhost:8000/api";
=======
import {
  Donor,
  DonorList,
  donorListSchema,
  donorSchema,
} from '../interfaces/Donor';

const apiUrl = 'http://localhost:8000/api';
>>>>>>> 02e2af05956d7407bf2e0823deced1fff6ef8853

export const getDonors = async (): Promise<DonorList> => {
  const response = await fetch(`${apiUrl}/donors`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const parsedData = donorListSchema.parse(data);

  return parsedData;
<<<<<<< HEAD
}
=======
};
>>>>>>> 02e2af05956d7407bf2e0823deced1fff6ef8853

export const getSingleDonor = async (donorId: number): Promise<Donor> => {
  const response = await fetch(`${apiUrl}/donors/${donorId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const parsedData = donorSchema.parse(data);

  return parsedData;
<<<<<<< HEAD
}



export const sendMessages = async (
  selectedUserIds: number[],
  bloodGroup: string
): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/sendMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
=======
};

export const sendMessages = async (
  selectedUserIds: number[],
  bloodGroup: string,
): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/sendMessages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
>>>>>>> 02e2af05956d7407bf2e0823deced1fff6ef8853
      },
      body: JSON.stringify({ selectedUserIds, bloodGroup }),
    });

    if (response.ok) {
<<<<<<< HEAD
      console.log("Messages sent successfully!");
    } else {
      console.error("Failed to send messages:", await response.text());
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error("Error sending messages:", error);
=======
      console.log('Messages sent successfully!');
    } else {
      console.error('Failed to send messages:', await response.text());
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error('Error sending messages:', error);
>>>>>>> 02e2af05956d7407bf2e0823deced1fff6ef8853
    throw error;
  }
};

export const updateDonor = async (updatedDonor: Donor): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/donors/${updatedDonor.userId}`, {
<<<<<<< HEAD
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
=======
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
>>>>>>> 02e2af05956d7407bf2e0823deced1fff6ef8853
      },
      body: JSON.stringify(updatedDonor),
    });

    if (response.ok) {
<<<<<<< HEAD
      console.log("Donor updated successfully!");
    } else {
      console.error("Failed to update donor:", await response.text());
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error("Error updating donor:", error);
=======
      console.log('Donor updated successfully!');
    } else {
      console.error('Failed to update donor:', await response.text());
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error('Error updating donor:', error);
>>>>>>> 02e2af05956d7407bf2e0823deced1fff6ef8853
    throw error;
  }
};

import i18n from '../i18n/i18n';
import {
  Donor,
  DonorList,
  donorListSchema,
  donorSchema,
} from '../interfaces/Donor';
import { logMessageListSchema } from '../interfaces/LogMessage';

const apiUrl = 'http://localhost:8000/api';

export const getDonors = async (): Promise<DonorList> => {
  const response = await fetch(`${apiUrl}/donors`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const parsedData = donorListSchema.parse(data);

  return parsedData;
};

export const getLogs = async () => {

  const response = await fetch(`${apiUrl}/logs`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const logs = await response.json();
  //const parsedLogs = logMessageListSchema.parse(logs);
  return logs;
};

export const getSingleDonor = async (donorId: number): Promise<Donor> => {
  const response = await fetch(`${apiUrl}/donors/${donorId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const parsedData = donorSchema.parse(data);

  return parsedData;
};

export const sendMessages = async (
  selectedUserIds: number[],
  bloodGroup: string,
  dateOfNextDonation: string,
): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/sendMessages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedUserIds, bloodGroup, dateOfNextDonation }),
    });
    const responseText = await response.text();
    if (response.ok) {
      console.log('Messages sent successfully!');
    } else {
      console.error('Failed to send messages:', responseText);
      throw new Error(responseText);
    }
  } catch (error) {
    console.error('Error sending messages:', error);
    throw error;
  }
};

export const updateDonor = async (updatedDonor: Donor): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/donors/${updatedDonor.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDonor),
    });

    if (response.ok) {
      console.log('Donor updated successfully!');
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error updating donor:', error);
    throw error;
  }
};

export const changeLanguageHandler = async (lang: string | undefined) => {
  try {
    await i18n.changeLanguage(lang === 'EN' ? 'UA' : 'EN');
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

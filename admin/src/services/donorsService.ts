import i18n from '../i18n/i18n';
import {
  Donor,
  DonorList,
  donorListSchema,
  donorSchema,
} from '../interfaces/Donor';

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
    if (response.ok) {
      console.log('Messages sent successfully!');
    } else {
      console.error('Failed to send messages:', await response.text());
      throw new Error(await response.text());
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

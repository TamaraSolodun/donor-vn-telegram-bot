import { DonorList, donorListSchema } from "../interfaces/Donor";

const apiUrl = "http://localhost:5000/api";

export const getDonors = async (): Promise<DonorList> => {
  const response = await fetch(`${apiUrl}/donors`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const parsedData = donorListSchema.parse(data);

  return parsedData;
}

export const sendMessages = async (
  selectedUserIds: number[]
): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/sendMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedUserIds }),
    });

    if (response.ok) {
      console.log("Messages sent successfully!");
    } else {
      console.error("Failed to send messages:", await response.text());
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
};

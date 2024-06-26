import { afterEach, describe, expect, it, jest } from '@jest/globals';
import {
  act,
  fireEvent,
  render,
  screen as s,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminContext, DataProvider, testDataProvider } from 'react-admin';

import { DonorList } from '../src/interfaces/Donor';
import { DonorsBoard } from '../src/pages/DonorsBoard';
import { getDonors } from '../src/services/donorsService';

import TestWrapper from './TestWrapper';
jest.mock('../src/services/donorsService');
const getDonorsMock = getDonors as jest.Mock<typeof getDonors>;
jest.mock('../src/hooks/useDonorsBoard', () => {
  (globalThis as any).handleSendMessage = jest.fn();
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue({
      handleSendMessage: (globalThis as any).handleSendMessage,
    }),
  };
});
const mockDonors: DonorList = [
  {
    userId: 1,
    username: 'Toma',
    phoneNumber: '+380963991209',
    firstName: 'Toma',
    surname: 'Solodun',
    dateOfBirth: null,
    sex: null,
    height: null,
    weight: null,
    bloodType: null,
    rhesusFactor: null,
    city: null,
    dateOfLastDonation: null,
    countOfDonations: null,
  },
  {
    userId: 2,
    username: 'Nata',
    phoneNumber: '+380963991209',
    firstName: 'Nata',
    surname: 'Solodun',
    dateOfBirth: null,
    sex: null,
    height: null,
    weight: null,
    bloodType: null,
    rhesusFactor: null,
    city: null,
    dateOfLastDonation: null,
    countOfDonations: null,
  },
];

describe('DonorsBoard', () => {
  afterEach(() => {
    getDonorsMock.mockReset();
  });
  it('handle click', () => {
    const { getByTestId } = render(
      <DonorsBoard data={[]} selectedIds={[1, 2, 3, 5]} />,
      {
        wrapper: AdminContext,
      },
    );
    const button = getByTestId('sendButton');
    fireEvent.click(button);
    //expect((globalThis as any).handleSendMessage).toHaveBeenCalledWith([1, 2, 3, 5]);
  });

  it('checkbox selection works in DonorsBoard', async () => {
    await act(async () => {
      render(<DonorsBoard data={mockDonors} selectedIds={[1, 2, 3, 5]} />, {
        wrapper: ({ children }) => (
          <AdminContext
            dataProvider={
              testDataProvider({
                getMany: () => Promise.resolve({ data: mockDonors }),
              }) as DataProvider<'donors'>
            }
          >
            <TestWrapper>{children}</TestWrapper>
          </AdminContext>
        ),
      });
    });
    console.log(mockDonors);

    //const usernames = getAllByTestId("username");
    await waitFor(() => {
      const checkboxes = s.getAllByTestId('username');
      expect(checkboxes).toHaveLength(mockDonors.length);
    });
    const checkboxes = s.getAllByTestId('username');
    await act(async () => {
      await userEvent.click(checkboxes[0]);
    });

    const button = s.getByTestId('sendButton');
    expect(button).toBeDefined();
    //await userEvent.click(checkboxes[1]);
    //expect(button).not.toHaveAttribute("disabled");
  });
});

import { afterEach, describe, expect, it, jest } from "@jest/globals";
import useDashboard from "../src/hooks/useDashboard";
import useDonorsBoard from "../src/hooks/useDonorsBoard";
import { renderHook } from "@testing-library/react-hooks";
import TestWrapper from "./TestWrapper";
import ButtonWrapperTest from "./ButtonWrapperTest";
import { render } from "@testing-library/react";

import { getDonors, sendMessages } from "../src/services/donorsService";
jest.mock("../src/services/donorsService");
const getDonorsMock = getDonors as jest.Mock<typeof getDonors>;
const sendMessagesMock = sendMessages as jest.Mock<typeof sendMessages>;

describe("useDashboard hook", () => {
  afterEach(() => {
    getDonorsMock.mockReset();
  });
  it("fetches donors on mount and updates state", async () => {
    const mockDonors = [
      {
        userId: 1,
        username: "Toma",
        phoneNumber: "+380963991209",
        firstName: "Toma",
        surname: "Solodun",
        dateOfBirth: null,
        sex: null,
        height: null,
        weight: null,
        bloodType: null,
        rhesusFactor: null,
        city: null,
      },
      {
        userId: 2,
        username: "Nata",
        phoneNumber: "+380963991209",
        firstName: "Nata",
        surname: "Solodun",
        dateOfBirth: null,
        sex: null,
        height: null,
        weight: null,
        bloodType: null,
        rhesusFactor: null,
        city: null,
      },
    ];
    getDonorsMock.mockResolvedValue(mockDonors);
    //1 - mock react-redux (jest.mock('react-redux', () => ({useDispatch: () => {}})))
    //2 - render-helper
    // render with redux/login -> wrapper.ts
    const { result, waitForNextUpdate } = renderHook(() => useDashboard(), {
      wrapper: TestWrapper,
    });

    expect(result.current.donors).toEqual([]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(getDonorsMock).toHaveBeenCalled();

    expect(result.current.donors).toEqual(mockDonors);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
  });

  it("handles API errors", async () => {
    const mockError = new Error("API request failed");
    getDonorsMock.mockRejectedValue(mockError);
    const { result, waitForNextUpdate } = renderHook(() => useDashboard(), {
      wrapper: TestWrapper,
    });

    expect(result.current.donors).toEqual([]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.donors).toEqual([]);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toEqual(mockError.message);
  });

  it("fetches donors, click send button", async () => {
    const mockDonors = [
      {
        userId: 1,
        username: "Toma",
        phoneNumber: "+380963991209",
        firstName: "Toma",
        surname: "Solodun",
        dateOfBirth: null,
        isSelected: false,
        sex: null,
        height: null,
        weight: null,
        bloodType: null,
        rhesusFactor: null,
        city: null,
      },
      {
        userId: 2,
        username: "Nata",
        phoneNumber: "+380963991209",
        firstName: "Nata",
        surname: "Solodun",
        dateOfBirth: null,
        isSelected: false,
        sex: null,
        height: null,
        weight: null,
        bloodType: null,
        rhesusFactor: null,
        city: null,
      },
    ];
    getDonorsMock.mockResolvedValue(mockDonors);

    const { result, waitForNextUpdate } = renderHook(() => useDashboard(), {
      wrapper: TestWrapper,
    });

    expect(result.current.donors).toEqual([]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(getDonorsMock).toHaveBeenCalled();

    expect(result.current.donors).toEqual(mockDonors);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();

    const tamaraDonor = result.current.donors.find(
      (donor) => donor.username === "Toma"
    );
    console.log(tamaraDonor);
    expect(tamaraDonor).toBeDefined();


    const { getByText } = render(<ButtonWrapperTest label="Send message" />);
    const buttonElement = getByText("Send message");
    expect(buttonElement).toBeDefined();

    const { result: donorsBoardResult } = renderHook(() =>
      useDonorsBoard({
        data: mockDonors,
        selectedIds: [],
      })
    );

    const { handleSendMessage } = donorsBoardResult.current;
    await handleSendMessage();
    expect(sendMessagesMock).toHaveBeenCalledWith([tamaraDonor?.userId]);
  });
});

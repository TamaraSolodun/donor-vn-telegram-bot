import { afterEach, describe, expect, it, jest } from "@jest/globals";
import useDashboard from "../src/hooks/useDashboard";
import { renderHook } from "@testing-library/react-hooks";
import TestWrapper from "./TestWrapper";
import { getDonors } from "../src/services/donorsService";
jest.mock("../src/services/donorsService");
const getDonorsMock = getDonors as jest.Mock<typeof getDonors>;

describe("useDashboard hook", () => {
  afterEach(()=> {
    getDonorsMock.mockReset();
  })
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
    ];
    getDonorsMock.mockResolvedValue(mockDonors);
    //1 - mock react-redux (jest.mock('react-redux', () => ({useDispatch: () => {}})))
    //2 - render-helper 
    // render with redux/login -> wrapper.ts
    const { result, waitForNextUpdate } = renderHook(() => useDashboard(), {wrapper: TestWrapper});

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
    const { result, waitForNextUpdate } = renderHook(() => useDashboard(), {wrapper: TestWrapper});

    expect(result.current.donors).toEqual([]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.donors).toEqual([]);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toEqual(mockError.message);
  });

  // it("updates state based on selectedDonors from store", () => {
  //   const mockStoreState = {
  //     donors: {
  //       donors: [
  //         {
  //           userId: 1,
  //           username: "Toma",
  //           phoneNumber: "+380963991209",
  //           firstName: "Toma",
  //           surname: "Solodun",
  //           dateOfBirth: null,
  //           sex: null,
  //           height: null,
  //           weight: null,
  //           bloodType: null,
  //           rhesusFactor: null,
  //           city: null,
  //         },
  //       ],
  //       loading: false,
  //       error: "Mock error from store",
  //     },
  //   };

  //   const { result } = renderHook(() => useDashboard(), {
  //     initialProps: { selectedDonors: mockStoreState.donors },
  //   });

  //   expect(result.current.donors).toEqual(mockStoreState.donors.donors);
  //   expect(result.current.loading).toEqual(mockStoreState.donors.loading);
  //   expect(result.current.error).toEqual(mockStoreState.donors.error);
  // });
});

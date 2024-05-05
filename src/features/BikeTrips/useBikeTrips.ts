import { useQuery } from "@tanstack/react-query";
import { BikeTrip } from "./types";
import Axios from "../../utils/axios";
import { URLS } from "../../URLS";

export const useBikeTrips = () => {
  const {
    data: bikeTrips,
    isPending: isBikeTripsPending,
    error: bikeTripsError
  } = useQuery<BikeTrip[]>({
    queryKey: ["bikeTrips"],
    queryFn: () =>
      Axios.get<BikeTrip[]>(URLS.BIKE_TRIPS()).then((res) => res.data)
  });

  return {
    bikeTrips,
    isBikeTripsPending,
    bikeTripsError
  };
};

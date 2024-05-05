import { useQuery } from "@tanstack/react-query";
import { BikeTrip, BikeTripLocations } from "./types";
import Axios from "../../utils/axios";
import { URLS } from "../../URLS";

export const useBikeTrips = (id?: string) => {
  const {
    data: bikeTrips,
    isPending: isBikeTripsPending,
    error: bikeTripsError
  } = useQuery<BikeTrip[]>({
    queryKey: ["bikeTrips"],
    queryFn: () =>
      Axios.get<BikeTrip[]>(URLS.BIKE_TRIPS()).then((res) => res.data)
  });

  const {
    data: bikeTrip,
    isPending: isBikeTripPending,
    error: bikeTripError
  } = useQuery<BikeTripLocations>({
    queryKey: ["bikeTrip", id],
    queryFn: () =>
      Axios.get<BikeTripLocations>(URLS.BIKE_TRIP_LOCATION(id!)).then((res) => res.data),
    enabled: !!id
  });

  return {
    bikeTrips,
    isBikeTripsPending,
    bikeTripsError,

    bikeTrip,
    isBikeTripPending,
    bikeTripError
  };
};

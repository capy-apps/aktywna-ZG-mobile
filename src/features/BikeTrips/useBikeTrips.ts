import { useMutation, useQuery } from "@tanstack/react-query";
import { BikeTrip, BikeTripLocations } from "./types";
import Axios from "../../utils/axios";
import { URLS } from "../../URLS";
import { useState } from "react";

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
      Axios.get<BikeTripLocations>(URLS.BIKE_TRIP_LOCATION(id!)).then(
        (res) => res.data
      ),
    enabled: !!id
  });

  const [favourites, setFavourites] = useState<number[]>(() => {
    const favs = localStorage.getItem("favourites");
    return favs ? JSON.parse(favs) : [];
  });

  const addFavourite = (id: number) => {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((f) => f !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  };

  const [ratings, setRatings] = useState<{ [key: number]: number }>(() => {
    const rating = localStorage.getItem("ratings");
    return rating ? JSON.parse(rating) : []
  });

  const rateBikeTripMutation = useMutation({
    mutationKey: ["rateBikeTrip"],
    mutationFn: ({ id, rating }: { id: number; rating: number }) =>
      Axios.post(URLS.RATE(id.toString()), { rating }).then((res) => res.data)
  });

  const rateBikeTrip = (id: number, rating: number) => {
    const newRatings = { ...ratings, [id]: rating };
    localStorage.setItem("ratings", JSON.stringify(newRatings));
    setRatings(newRatings);
    rateBikeTripMutation.mutate({ id, rating });
  };

  return {
    bikeTrips,
    isBikeTripsPending,
    bikeTripsError,

    bikeTrip,
    isBikeTripPending,
    bikeTripError,

    favourites,
    addFavourite,
    ratings,
    rateBikeTripMutation,
    rateBikeTrip
  };
};

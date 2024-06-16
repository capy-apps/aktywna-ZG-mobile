import { useMutation, useQuery } from "@tanstack/react-query";
import { BikeTrip, BikeTripLocations, BikeTripRequest } from "./types";
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
    return rating ? JSON.parse(rating) : [];
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

  const addPhoto = useMutation({
    mutationKey: ["addPhoto"],
    mutationFn: ({ id, photo }: { id: number; photo: File }) => {
      const formData = new FormData();
      formData.append("file", photo);
      return Axios.post(URLS.PHOTOS(id.toString()), formData).then(
        (res) => res.data
      );
    }
  });

  const addBikeTrip = useMutation({
    mutationKey: ["addBikeTrip"],
    mutationFn: (data: BikeTripRequest) =>
      Axios.post(URLS.BIKE_TRIPS(), data).then((res) => res.data)
  });

  const addBikeTripLocations = useMutation({
    mutationKey: ["addBikeTripLocations"],
    mutationFn: ({ id, file }: { id: number; file: File }) => {
      const formData = new FormData();
      formData.append("file", file);
      return Axios.post(
        URLS.ADD_BIKE_TRIP_LOCATION(id.toString()),
        formData
      ).then((res) => res.data);
    }
  });

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
    rateBikeTrip,

    addPhoto,

    addBikeTrip,
    addBikeTripLocations
  };
};

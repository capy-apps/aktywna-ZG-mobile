import { useQuery } from "@tanstack/react-query";
import { BikePath } from "./types";
import Axios from "../../utils/axios";
import { URLS } from "../../URLS";

export const useBikePaths = () => {
  const {
    data: bikePaths,
    isPending: isBikePathsPending,
    error: bikePathsError
  } = useQuery<BikePath[]>({
    queryKey: ["bikePaths"],
    queryFn: () =>
      Axios.get<BikePath[]>(URLS.BIKE_PATHS()).then((res) => res.data)
  });

  return {
    bikePaths,
    isBikePathsPending,
    bikePathsError
  };
};

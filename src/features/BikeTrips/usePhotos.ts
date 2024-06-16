import { useQuery } from "@tanstack/react-query";
import { PhotoResponse } from "./types";
import Axios from "../../utils/axios";
import { URLS } from "../../URLS";

export const usePhotos = () => {
  const {
    data: photos,
    isPending: isPhotosPending,
    error: photosError,
    refetch: refetchPhotos
  } = useQuery<PhotoResponse[]>({
    queryKey: ["photos"],
    queryFn: () =>
      Axios.get<PhotoResponse[]>(URLS.PHOTOS()).then((res) => res.data)
  });

  return {
    photos,
    refetchPhotos,
    isPhotosPending,
    photosError
  };
};

import { useQuery } from "@tanstack/react-query";
import Axios from "../../utils/axios";
import { Event } from "./types";
import { URLS } from "../../URLS";

export const useEvents = () => {
  const {
    data: events,
    isPending: isEventsPending,
    error: eventsError
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: () =>
      Axios.get<Event[]>(URLS.EVENTS()).then((res) => res.data)
  });

  return {
    events,
    isEventsPending,
    eventsError
  };
}
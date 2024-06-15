import { useQuery } from "@tanstack/react-query";
import Axios from "../../utils/axios";
import { Event } from "./types";
import { URLS } from "../../URLS";

export const useEvents = (userUuid?: string) => {
  const {
    data: events,
    isPending: isEventsPending,
    error: eventsError
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: () => Axios.get<Event[]>(URLS.EVENTS()).then((res) => res.data)
  });

  const {
    data: userEvents,
    isPending: isUserEventsPending,
    error: userEventsError
  } = useQuery<Event[]>({
    queryKey: ["userEvents", userUuid],
    queryFn: () =>
      Axios.get<Event[]>(URLS.USER_EVENTS(userUuid!)).then((res) => res.data),
    enabled: !!userUuid
  });

  return {
    events,
    isEventsPending,
    eventsError,

    userEvents,
    isUserEventsPending,
    userEventsError
  };
};

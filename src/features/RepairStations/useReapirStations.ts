import { useQuery } from "@tanstack/react-query";
import { RepairStation } from "./types";
import Axios from "../../utils/axios";
import { URLS } from "../../URLS";

export const useRepairStations = () => {
  const {
    data: repairStations,
    isPending: isRepairStationsPending,
    error: repairStationsError
  } = useQuery<RepairStation[]>({
    queryKey: ["repairStations"],
    queryFn: () =>
      Axios.get<RepairStation[]>(URLS.REPAIR_STATIONS()).then((res) => res.data)
  });

  return {
    repairStations,
    isRepairStationsPending,
    repairStationsError
  };
}
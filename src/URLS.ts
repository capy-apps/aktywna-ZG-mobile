
export const URLS = {
  API: 'https://aktywna-zg.wybran.workers.dev',
  BIKE_TRIPS: () => '/map/bike-trips',
  BIKE_TRIP_LOCATION: (id: string) => `/map/bike-trips/${id}`,
  BIKE_PATHS: () => '/map/bike-paths',
  REPAIR_STATIONS: () => '/map/repair-stations',
  EVENTS: () => '/events',
}
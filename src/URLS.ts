
export const URLS = {
  API: 'https://aktywna-zg.wybran.workers.dev',
  BIKE_TRIPS: () => '/map/bike-trips',
  BIKE_TRIP_LOCATION: (id: string) => `/map/bike-trips/${id}`,
  ADD_BIKE_TRIP_LOCATION: (id: string) => `/map/bike-trips/gpx/${id}`,
  PHOTOS: (id: string) => `/map/bike-trips/photo/${id}`,
  RATE: (id: string) => `/map/bike-trips/rate/${id}`,
  BIKE_PATHS: () => '/map/bike-paths',
  REPAIR_STATIONS: () => '/map/repair-stations',
  EVENTS: () => '/events',
  USER_EVENTS: (uuid: string) => `/events/user/${uuid}`,
}
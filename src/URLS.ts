
export const URLS = {
  API: 'https://aktywna-zg.wybran.workers.dev',
  BIKE_TRIPS: () => '/map/bike-trips',
  BIKE_TRIP_LOCATION: (id: string) => `/map/bike-trips/${id}`,
  ADD_BIKE_TRIP_LOCATION: (id: string) => `/map/bike-trips/gpx/${id}`,
  PHOTO: (id: string) => `/map/bike-trips/photo/${id}`,
  PHOTOS: () => '/map/bike-trips/photos',
  RATE: (id: string) => `/map/bike-trips/rate/${id}`,
  BIKE_PATHS: () => '/map/bike-paths',
  REPAIR_STATIONS: () => '/map/repair-stations',
  EVENTS: () => '/events',
  USER_EVENTS: (uuid: string) => `/events/user/${uuid}`,
  IS_ADMIN: () => '/admin',
  PUBLIC_BIKE_TRIP: (id: string) => `/map/bike-trips/public/${id}`,
  PUBLIC_PHOTO: (id: string) => `/map/bike-trips/photo/public/${id}`,
  DELETE_BIKE_TRIP: (id: string) => `/map/bike-trips/${id}`,
}
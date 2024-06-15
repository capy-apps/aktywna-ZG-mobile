
export interface Location {
  latitude:  number;
  longitude: number;
}

export interface BikeTrip {
  id: number;
  name: string;
  length: number;
  difficulty: string;
  description: string;
  created_at: number;
  rating: number;
}

export interface BikeTripLocations extends BikeTrip {
  locations: Location[] | [];
  photos: number[];
}
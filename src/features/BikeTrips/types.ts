
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
  image: string;
  created_at: number;
}

export interface BikeTripLocations extends BikeTrip {
  locations: Location[] | [];
}
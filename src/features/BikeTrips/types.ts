
export interface Location {
  latitude:  number;
  longitude: number;
}

export interface BikeTrip {
  id: number;
  public: boolean;
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

export interface BikeTripRequest {
  name: string;
  difficulty: string;
  description: string;
}

export interface BikePath {
  id:        number;
  name:      string;
  length:    number;
  locations: Location[];
}

export interface Location {
  latitude:  number;
  longitude: number;
}
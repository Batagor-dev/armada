export interface Vehicle {
  id: number;
  name: string;
  model: string;
  type: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel: string;
  seats: number;
  color: string;
  daily_price: number;
  description?: string;
  img: string[];
}
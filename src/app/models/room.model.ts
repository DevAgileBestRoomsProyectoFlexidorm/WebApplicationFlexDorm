export interface RoomModel {
  id: number;
  roomId:string;
  title: string;
  imageUrl: string;
  arrenderId: string;
  description: string;
  price: number;
  address: string;
  nearUniversities: string;
  nearUniversitiesArray: string[];
  availability: string;
  startTime: string;
  endTime: string;
  email: string;
  phone: string;
  shortDescription: string;
  active:boolean;
}

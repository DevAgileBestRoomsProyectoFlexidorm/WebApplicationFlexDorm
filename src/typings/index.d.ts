export interface RoomData {
  title: string;
  imageUrl: string;
  arrenderId: string|null;
  description: string;
  price: number;
  address: string;
  nearUniversities: string;
}
export interface AccountData {
  id: any;
  name:string;
  lastname:string
  username: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  profilePicture: string;
}

// Declaración global de ApexCharts
declare var ApexCharts: any;

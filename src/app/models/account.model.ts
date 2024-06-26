export class Account {
  userId: number;
  firstname: string;
  lastname:string;
  username:string;
  phoneNumber:string;
  email: string;
  address:string;
  profilePicture:string
  password: string;
  dtype:Dtype;
  birthDate:string;
  gender: string;
  university:string;
  isVerified:boolean;
  isEnabled:boolean;
  token: string;
  message: string;
  active:boolean;

  constructor(userId: number, firstname: string, lastname: string, username: string, phoneNumber: string, email: string,
    address: string, profilePicture: string, password: string, dtype: Dtype, birthDate: string,
    gender: string, university: string, isVerified: boolean, isEnabled: boolean, token: string, message:string,active:boolean) {
    this.userId = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.profilePicture = profilePicture;
    this.password = password;
    this.dtype = dtype;
    this.birthDate = birthDate;
    this.gender = gender;
    this.university = university;
    this.isVerified = isVerified;
    this.isEnabled = isEnabled;
    this.token = token;
    this.message=message;
    this.active=active;
    }

}

export enum Dtype {
  Student = 'Student',
  Arrender = 'Arrender',
  Admin = 'Admin',
}

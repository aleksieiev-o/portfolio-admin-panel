export interface IAuthRequestDto {
  email: string;
  password: string;
}

export interface IUser {
  uid: string;
  email: string | null
}

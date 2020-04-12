export interface IBook {
  bookID?: string;
  userID: string;
  title: string;
  isbn?: string;
  numberOfPages?: number;
  authors?: string[];
}

export interface IAuth0User {
  nickname?: string;
  name?: string;
  picture?: string;
  email?: string;
  email_verified: boolean;
  sub?: string;
}
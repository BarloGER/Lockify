export interface IRegisterGuestRequestModel {
  username: string;
  email: string;
  password: string;
  masterPassword: string;
  newsletterAccepted: boolean;
  termsAccepted: boolean;
}

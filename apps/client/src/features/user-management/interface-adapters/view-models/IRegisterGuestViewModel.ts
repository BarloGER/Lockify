export interface IRegisterGuestViewModel {
  formData: {
    username: string;
    email: string;
    password: string;
    masterPassword: string;
    newsletterAccepted: boolean;
    termsAccepted: boolean;
  };

  labels: {
    username: string;
    email: string;
    password: string;
    masterPassword: string;
    newsletterAccepted: string;
    termsAccepted: string;
    submitButton: string;
  };

  placeholders: {
    username: string;
    email: string;
    password: string;
    masterPassword: string;
  };

  responseData: {
    success: boolean | null;
    message: string | "";
  } | null;
}

import { IRegisterGuestViewModel } from "./IRegisterGuestViewModel";

export class RegisterGuestViewModel implements IRegisterGuestViewModel {
  formData = {
    username: "",
    email: "",
    password: "",
    masterPassword: "",
    newsletterAccepted: false,
    termsAccepted: false,
  };

  labels = {
    title: "userManagement.registerGuest.labels.title",
    username: "userManagement.registerGuest.labels.username",
    email: "userManagement.registerGuest.labels.email",
    password: "userManagement.registerGuest.labels.password",
    masterPassword: "userManagement.registerGuest.labels.masterPassword",
    newsletterAccepted:
      "userManagement.registerGuest.labels.newsletterAccepted",
    termsAccepted: "userManagement.registerGuest.labels.termsAccepted",
    submitButton: "userManagement.registerGuest.labels.submitButton",
  };

  placeholders = {
    username: "userManagement.registerGuest.placeholders.username",
    email: "userManagement.registerGuest.placeholders.email",
    password: "userManagement.registerGuest.placeholders.password",
    masterPassword: "userManagement.registerGuest.placeholders.masterPassword",
  };

  responseData = {
    success: false,
    message: "",
  };
}

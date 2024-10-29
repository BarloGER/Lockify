import {
  Checkbox,
  Input,
} from "../../../../../../frameworks/react/components/atoms";
import { RegisterGuestViewModel } from "../../../../interface-adapters/view-models/RegisterGuestViewModel";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
  viewModel: RegisterGuestViewModel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  processRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  viewModel,
  handleInputChange,
  processRegistration,
}) => {
  const { t } = useTranslation();
  const { formData, labels, placeholders } = viewModel;

  return (
    <div className="flex items-center justify-center bg-backgroundColor text-textColor">
      <form
        className="bg-backgroundColor p-8 rounded-md  max-w-md"
        onSubmit={processRegistration}
      >
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder={t(placeholders.username)}
          label={t(labels.username)}
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t(placeholders.email)}
          label={t(labels.email)}
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder={t(placeholders.password)}
          label={t(labels.password)}
        />
        <Input
          type="password"
          name="masterPassword"
          value={formData.masterPassword}
          onChange={handleInputChange}
          placeholder={t(placeholders.masterPassword)}
          label={t(labels.masterPassword)}
        />
        <Checkbox
          name="newsletterAccepted"
          checked={formData.newsletterAccepted}
          onChange={handleInputChange}
          label={t(labels.newsletterAccepted)}
        />
        <Checkbox
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleInputChange}
          label={t(labels.termsAccepted)}
        />
        <button
          type="submit"
          className=" bg-primaryColor text-text p-2 hover:bg-accentColor"
        >
          {t(labels.submitButton)}
        </button>
      </form>
    </div>
  );
};

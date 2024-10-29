import { useState, useEffect, useMemo } from "react";
import { RegisterForm } from "../organisms/RegisterForm";
import { useTranslation } from "react-i18next";
import { MainTemplate } from "../../../../../../frameworks/react/components/templates/MainTemplate";
import { Message } from "../../../../../../frameworks/react/components/atoms";
import { RegisterGuestPresenter } from "../../../../interface-adapters/presenters/RegisterGuestPresenter";
import { RegisterGuestController } from "../../../../interface-adapters/controllers/RegisterGuestController";
import { RegisterGuestInteractor } from "../../../../use-cases/register-guest/RegisterGuestInteractor";
import { CryptoService } from "../../../../../../services/cryptography/CryptoService";
import { UserRepository } from "../../../../interface-adapters/repositories/UserRepository";
import { RegisterGuestViewModel } from "../../../../interface-adapters/view-models/RegisterGuestViewModel";

export const RegisterPage = (): JSX.Element => {
  const { t } = useTranslation();

  const [viewModel, setViewModel] = useState<RegisterGuestViewModel | null>(
    null
  );

  const presenter = useMemo(() => new RegisterGuestPresenter(), []);
  const cryptoService = useMemo(() => new CryptoService(), []);
  const userRepository = useMemo(() => new UserRepository(), []);
  const interactor = useMemo(
    () => new RegisterGuestInteractor(cryptoService, userRepository, presenter),
    [cryptoService, userRepository, presenter]
  );
  const controller = useMemo(
    () => new RegisterGuestController(interactor),
    [interactor]
  );

  useEffect(() => {
    presenter.setOnViewModelUpdated(
      (updatedViewModel: RegisterGuestViewModel) => {
        setViewModel({ ...updatedViewModel });
      }
    );
  }, [presenter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked, type } = e.target;
    const fieldName = name as keyof RegisterGuestViewModel["formData"];

    if (type === "checkbox") {
      presenter.updateFormData(fieldName, checked);
    } else {
      presenter.updateFormData(fieldName, value);
    }
  };

  const processRegistration = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!viewModel) return;

    try {
      await controller.registerGuest(viewModel.formData);
    } catch (error) {
      console.error(error);
      presenter.present({
        success: false,
        message: "unknownError",
      });
    }
  };

  if (!viewModel) {
    return <div>Loading...</div>;
  }

  return (
    <MainTemplate>
      <section className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-primaryColor text-3xl font-bold mb-6 text-center">
          {t(viewModel.labels.title)}
        </h1>
        <RegisterForm
          viewModel={viewModel}
          handleInputChange={handleInputChange}
          processRegistration={processRegistration}
        />
        {viewModel.responseData && (
          <Message
            success={viewModel.responseData.success || false}
            message={t(viewModel.responseData.message) || ""}
          />
        )}
      </section>
    </MainTemplate>
  );
};

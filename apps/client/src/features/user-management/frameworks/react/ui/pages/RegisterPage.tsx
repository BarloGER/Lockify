import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Message } from "@global-ui/atoms";
import { MainTemplate } from "@global-ui/templates";
import { CryptoService } from "@global-services/cryptography";

import { RegisterForm } from "@user-management-ui/organisms";
import { RegisterGuestController } from "@user-management-interface-adapters/controllers";
import { RegisterGuestPresenter } from "@user-management-interface-adapters/presenters";
import { UserRepository } from "@user-management-interface-adapters/repositories";
import { RegisterGuestViewModel } from "@user-management-interface-adapters/view-models";
import { RegisterGuestInteractor } from "@user-management-use-cases/register-guest";

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

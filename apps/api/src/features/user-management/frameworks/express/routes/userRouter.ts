import { Router } from "express";
import { RegisterGuestController } from "../../../interface-adapters/controllers/RegisterGuestController";
import { BcryptPasswordHasher } from "../../bcrypt/BcryptPasswordHasher";
import { UserRepository } from "../../../interface-adapters/repositories/UserRepository";
import { pgClient } from "../../../../../frameworks/db/postgres";
import { RegisterGuestInteractor } from "../../../use-cases/register-guest/RegisterGuestInteractor";
import { RegisterGuestPresenter } from "../../../interface-adapters/presenters/RegisterGuestPresenter";
import { TokenGenerator } from "../../../services/token-generator/TokenGenerator";
import { NotificationService } from "../../../../../services/notification/NotificationService";
import { IRegisterGuestRequestModel } from "../../../use-cases/register-guest/IRegisterGuestRequestModel";
import { I18nTranslator } from "../../../../../services/translation/I18nTranslator";

export const userRouter = Router();

const passwordHasher = new BcryptPasswordHasher();
const tokenGenerator = new TokenGenerator();
const notificationService = new NotificationService();
const userRepository = new UserRepository(pgClient);
const registerGuestPresenter = new RegisterGuestPresenter();
const registerGuestInteractor = new RegisterGuestInteractor(
  passwordHasher,
  tokenGenerator,
  notificationService,
  userRepository,
  registerGuestPresenter
);
const registerGuestController = new RegisterGuestController(
  registerGuestInteractor
);

userRouter.post("/register", async (req, res) => {
  const translator = new I18nTranslator(req.t);
  const rawData: IRegisterGuestRequestModel = req.body;

  try {
    await registerGuestController.registerGuest(rawData);

    const response = registerGuestPresenter.getResponse(translator);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: translator.translate(error.message) });
  }
});

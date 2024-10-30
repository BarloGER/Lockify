import { Router } from "express";

import { pgClient } from "@global-frameworks/db/postgres";
import { NotificationService } from "@global-services/notification";
import { I18nTranslator } from "@global-services/translation";

import { BcryptPasswordHasher } from "@user-management-frameworks/bcrypt";
import { RegisterGuestController } from "@user-management-interface-adapters/controllers";
import { RegisterGuestPresenter } from "@user-management-interface-adapters/presenters";
import { UserRepository } from "@user-management-interface-adapters/repositories";
import { TokenGenerator } from "@user-management-services/token-generator";
import {
  RegisterGuestInteractor,
  IRegisterGuestRequestModel,
} from "@user-management-use-cases/register-guest";

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
    if (response.success) {
      res.status(201).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.log(error);
  }
});

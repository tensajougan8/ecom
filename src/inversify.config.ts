import { Container } from 'inversify';
import { TYPES } from './types';
import { IAuthService } from './services/interfaces/auth.interface';
import { AuthService } from './services/auth';
import { IUserRepository } from './repositories/interfaces/user.interface';
import { UserRepository } from './repositories/user';
import { AuthController } from './controllers/auth';
import { ISellerRepository } from './repositories/interfaces/seller.interface';
import { SellerRepository } from './repositories/seller';
import { SellerController } from './controllers/seller';

const myContainer = new Container();
myContainer.bind<AuthController>(TYPES.AuthController).to(AuthController);
myContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
myContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService);
myContainer
  .bind<ISellerRepository>(TYPES.SellerRepository)
  .to(SellerRepository);
myContainer.bind<SellerController>(TYPES.SellerController).to(SellerController);

export { myContainer };

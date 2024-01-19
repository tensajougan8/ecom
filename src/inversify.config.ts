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
import { ISellerService } from './services/interfaces/seller.interface';
import { SellerService } from './services/seller';
import { IBuyerRepository } from './repositories/interfaces/buyer.interface';
import { BuyerRepository } from './repositories/buyer';
import { IBuyerService } from './services/interfaces/buyer.interface';
import { BuyerService } from './services/buyer';
import { BuyerController } from './controllers/buyer';

const myContainer = new Container();
myContainer.bind<AuthController>(TYPES.AuthController).to(AuthController);
myContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
myContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService);
myContainer
  .bind<ISellerRepository>(TYPES.SellerRepository)
  .to(SellerRepository);
myContainer.bind<SellerController>(TYPES.SellerController).to(SellerController);
myContainer.bind<ISellerService>(TYPES.SellerService).to(SellerService);
myContainer.bind<IBuyerRepository>(TYPES.BuyerRepository).to(BuyerRepository);
myContainer.bind<IBuyerService>(TYPES.BuyerService).to(BuyerService);
myContainer.bind<BuyerController>(TYPES.BuyerController).to(BuyerController);
export { myContainer };

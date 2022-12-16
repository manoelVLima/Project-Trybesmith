import LoginModel from '../models/login.model';
import connection from '../models/connection';
import User from '../interfaces/user.interface';

export default class LoginService {
  public model;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async userLogin(userData: User): Promise<User> {
    const [user] = await this.model.userLogin(userData);    
    return user;
  }
}
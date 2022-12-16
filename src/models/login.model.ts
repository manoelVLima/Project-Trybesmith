import { Pool } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class LoginModel {
  public connection;
  
  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async userLogin(userData: User):Promise<User[]> {
    const { username, password } = userData;
    const [user] = await this.connection.execute(`
    SELECT * FROM Trybesmith.users WHERE username=? AND password=?`, [username, password]);
    return user as User[];
  }
}
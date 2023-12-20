import { User } from "../../src/entities/user/User";


export const mockAddAccountParams = {
  name: 'Test User',
  email: 'teste@gmail.com',
  password:'',
  roles:[],
  permissions:[],
};

export const mockUserModel: User = {
  id: 'abc123',
  created_at: new Date,
  ...mockAddAccountParams,
};
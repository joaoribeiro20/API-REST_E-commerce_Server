import { User } from "../../src/entities/user/User";
import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from 'bcryptjs'

export const mockAddAccountParams = {
  name: 'Test User',
  email: 'teste@gmail.com',
  password:'123abc',
  roles:[],
  permissions:[],
};

export const mockUserModel: User =  {
  name: 'Test User',
  email: 'teste@gmail.com',
  password: '212331asas',
  id: uuidv4(),
  created_at: new Date,
  roles:[],
  permissions:[],
};

export const dateLogin = {
  user: {
    name: 'Test User',
    email: 'teste@gmail.com',
    roles: [],
    permissions: [],
    id: uuidv4(),
    created_at: new Date,
},
token:  '',
}

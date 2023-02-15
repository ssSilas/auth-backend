import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserEntity = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(UserEntity),
          useValue: mockUserEntity
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('list all users', () => {
    //execute
    const createUser = new UserEntity({ id: 1, name: "Silas", email: "silas@gmail.com", login: "silas", status:})
    const findAll = a

    expect(service).toBeDefined();
  });
});

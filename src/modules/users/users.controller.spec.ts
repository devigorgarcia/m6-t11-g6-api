import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let userController: UsersController;
  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: String,
        ...dto,
      };
    }),
    list: jest.fn(),
  };

  const mockedUser = {
    name: 'Normal User',
    password: '123456',
    email: 'cayo@mail.com',
    cpf: '06640488116',
    fone: '(34) 99164-3423',
    birthday: '08/02/2004',
    descripiton: 'Oi eu sou Cayo',
    is_admin: false,
    address: {
      cep: '79005-240',
      state: 'MS',
      city: 'Campo Grande',
      street: 'Rua Santa Amélia',
      number: 228,
      complement: 'Casa 2',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UsersController>(UsersController);
  });

  describe('User CRUD', () => {
    it('CREATE - Should create a user', async () => {
      const expected_result = await userController.create(mockedUser);
      expect(expected_result).toEqual({
        id: expect.any(Function),
        name: 'Normal User',
        password: '123456',
        email: 'cayo@mail.com',
        cpf: '06640488116',
        fone: '(34) 99164-3423',
        birthday: '08/02/2004',
        descripiton: 'Oi eu sou Cayo',
        is_admin: false,
        address: {
          cep: '79005-240',
          state: 'MS',
          city: 'Campo Grande',
          street: 'Rua Santa Amélia',
          number: 228,
          complement: 'Casa 2',
        },
      });

      expect(mockUserService.create).toHaveBeenCalledWith(mockedUser);
    });

    it('READ - Should return all users', async () => {
      const result = [];
      jest
        .spyOn(userController, 'listUsers')
        .mockImplementation(async () => result);
      const expected_result = await userController.listUsers();

      expect(expected_result).toBe(result);
    });

    it('READ - Should return one user', async () => {
      const user = await userController.create(mockedUser);

      const result = [];
      jest
        .spyOn(userController, 'listUser')
        .mockImplementation(async () => result);
      const expected_result = await userController.listUser(user.id);

      expect(expected_result).toBe(result);
    });
  });
});

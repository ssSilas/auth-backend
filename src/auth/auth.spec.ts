import { Test, TestingModule } from '@nestjs/testing';
import { Tokengenerate } from './auth.service';

describe('Tokengenerate', () => {
  let service: Tokengenerate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Tokengenerate],
    }).compile();

    service = module.get<Tokengenerate>(Tokengenerate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

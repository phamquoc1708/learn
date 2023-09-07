import { Document } from 'mongoose';
import { AbstractRepository } from 'src/common/repositories';

export class UserDocument extends Document {
  email: string;
  password: string;
}

export class AbstractAuthService<
  D extends UserDocument,
  R extends AbstractRepository<D>,
> {
  public repository: R;
  constructor(repository: R) {
    this.repository = repository;
  }

  async findActiveUserByEmail(email: string) {
    return this.repository.findMany({
      conditions: {
        email,
      },
    });
  }
}

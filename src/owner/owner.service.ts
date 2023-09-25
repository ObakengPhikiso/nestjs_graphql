import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>){}

  create(createOwnerInput: CreateOwnerInput) {
    const owner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(owner);
  }

  findAll() {
    return this.ownersRepository.find()
  }

  findOne(id: number) {
    return this.ownersRepository.findOneOrFail({
      where: {
        id: id,
      }
    })
  }

  update(updateOwnerInput: UpdateOwnerInput) {
    const owner = this.ownersRepository.create(updateOwnerInput);
    return this.ownersRepository.save(owner)
  }

  remove(id: number) {
    return this.ownersRepository.delete(id)
  }

  
}

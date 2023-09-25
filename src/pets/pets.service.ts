import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnerService } from 'src/owner/owner.service';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownerService: OwnerService) { }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find()
    }

    async findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail({
            where: { id: id}
        })
    }

    async createPet(petData: CreatePetInput): Promise<Pet> {
        const pet = this.petsRepository.create(petData)
        return this.petsRepository.save(pet)
    }

    async getOwner(id: number): Promise<Owner> {
        return this.ownerService.findOne(id);
    }

}

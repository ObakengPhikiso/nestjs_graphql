import { Args, Int, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Query } from '@nestjs/graphql';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owner/entities/owner.entity';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService: PetsService) {}

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
      return  this.petService.findAll()
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petService.createPet(createPetInput)
    }

    @Query(returns => Pet)
    findById(@Args('id', {type:() => Int}) id: number): Promise<Pet> {
        return this.petService.findOne(id)
    }

    @ResolveField(returns => Owner)
    owner(@Parent() pet: Pet): Promise<Owner> {
        return this.petService.getOwner(pet.ownerId)
    }
}

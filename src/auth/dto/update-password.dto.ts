import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput {
    @Field()
    old_password: string;

    @Field()
    new_password: string;
}

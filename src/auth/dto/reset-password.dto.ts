import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
    @Field()
    token: string;

    @Field()
    new_password: string;
}

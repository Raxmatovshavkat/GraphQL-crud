import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RevokeTokenInput {
    @Field()
    refresh_token: string;
}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './Mail/mail.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/graphql'),
    AuthModule,
    MailModule,
    AuthModule
  ],
})
export class AppModule { }

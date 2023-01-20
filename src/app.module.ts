import * as admin from 'firebase-admin';
import { BookingModule } from './modules/booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dejan:hkc2002!hkc0723@cluster0.xq4hbjz.mongodb.net/?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: async ({ req }) => {
        const token =
          req && req.headers.authorization && req.headers.authorization;
        let user = null;
        if (token) {
          user = await admin.auth().verifyIdToken(token);
        }

        return {
          user,
        };
      },
    }),
    ConfigModule.forRoot(),
    BookingModule,
  ],
})
export class AppModule {}

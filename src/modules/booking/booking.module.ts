import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking.model';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [],
  exports: [BookingService],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}

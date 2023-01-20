import { Booking, BookingDocument } from './booking.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
  ) {}

  async newBooking(
    title: string,
    start: string,
    end: string,
    user_name: string,
    user_email: string,
  ): Promise<Booking> {
    const newBooking = await new this.bookingModel({
      bookingTitle: title,
      startDate: start,
      endDate: end,
      user: { fullName: user_name, email: user_email },
    });
    return newBooking.save();
  }

  async updateBooking(
    booking_id: string,
    startDate: string,
    endDate: string,
    bookingTitle: string,
    user_email: string,
  ): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(
      booking_id,
      {
        bookingTitle,
        startDate,
        endDate,
      },
    );
    return updatedBooking;
  }

  async deleteBooking(
    booking_id: string,
    user_email: string,
  ): Promise<Booking> {
    const result = await this.bookingModel.findByIdAndDelete(booking_id);
    return result;
  }

  async findAll(user_email: string): Promise<Booking[]> {
    return this.bookingModel.find().where({ 'user.email': user_email }).exec();
  }
}

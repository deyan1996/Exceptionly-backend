import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { CurrentUser } from '../../userDecorator/user.decorator';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query((returns) => [Booking], { name: 'bookings', nullable: false })
  async getBookings(@CurrentUser() user) {
    return this.bookingService.findAll(user.email);
  }

  @Mutation((returns) => Booking, { name: 'new_booking', nullable: true })
  async newBooking(
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'start', type: () => String }) start: string,
    @Args({ name: 'end', type: () => String }) end: string,
    @CurrentUser() user,
  ) {
    return this.bookingService.newBooking(
      title,
      start,
      end,
      user.name,
      user.email,
    );
  }

  @Mutation((returns) => Booking, { name: 'update_booking', nullable: true })
  async updateBooking(
    @Args({ name: 'booking_id', type: () => String }) booking_id: string,
    @Args({ name: 'start', type: () => String }) start: string,
    @Args({ name: 'end', type: () => String }) end: string,
    @Args({ name: 'title', type: () => String }) title: string,
    @CurrentUser() user,
  ) {
    return this.bookingService.updateBooking(
      booking_id,
      start,
      end,
      title,
      user.email,
    );
  }

  @Mutation((returns) => Booking, { name: 'delete_booking', nullable: true })
  async deleteBooking(
    @Args({ name: 'booking_id', type: () => String }) booking_id: string,
    @CurrentUser() user,
  ) {
    return this.bookingService.deleteBooking(booking_id, user.email);
  }
}

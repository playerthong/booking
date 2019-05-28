const router = require('koa-router')({
  prefix: '/api/booking'
});
let bookingService = require('../service/booking.service');

router.post('/listByCustomer',async (ctx, next) => {
  await bookingService.listBookingByCustomer(ctx);
});

router.get('/list',async (ctx, next) => {
  await bookingService.listBooking(ctx);
});

router.post('/save',async (ctx, next) => {
    await bookingService.saveBooking(ctx);
});
router.post('/delete',async (ctx, next) => {
  await bookingService.deleteBooking(ctx);
});

module.exports = router;
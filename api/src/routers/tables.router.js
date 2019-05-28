const router = require('koa-router')({
    prefix: '/api/tables'
  });
  let tableService = require('../service/table.service');
  
  router.get('/list',async (ctx, next) => {
    await tableService.list(ctx);
  });
  router.post('/save',async (ctx, next) => {
    await tableService.saveTable(ctx);
  });
  router.post('/delete',async (ctx, next) => {
    await tableService.deteleTable(ctx);
  });
  
  module.exports = router;
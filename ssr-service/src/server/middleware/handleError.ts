export default (options?: any) => {
  // handle node error
  process.on('uncaughtException', (err) => {
    console.error(err);
  });

  // handle koa Middleware Error
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.error(e);
    }
  };
};
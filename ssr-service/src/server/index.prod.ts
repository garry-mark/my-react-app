import 'babel-polyfill';

import app from '@/server/app';

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
  );
});

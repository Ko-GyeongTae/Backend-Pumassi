import express, { Application } from 'express';

const app: Application = express();

app.listen(4120, () => {
  console.log(`
######################################
🛡️  Server listening on port: 4120  🛡️
######################################
`);
});

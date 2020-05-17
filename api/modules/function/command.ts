import { app } from '../initial';

export default () => {
  app.command('/echo', async ({ command, ack, say }) => {
    await ack();
    await say(`${command.text}`);
  });
}
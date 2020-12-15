import { app } from '../initial';
import { UsersInfo } from '../../types/interface';

export default (): void => {
  app.event('member_joined_channel', async ({ event, context }) => {
    const userInfo = await app.client.users.info({
      token: context.botToken,
      user: event.user
    });
    // eslint-disable-next-line @typescript-eslint/camelcase
    const {user: {real_name}}: UsersInfo = userInfo;

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      // eslint-disable-next-line @typescript-eslint/camelcase
      text: `Welcome! ${real_name}`,
    });
  });
}
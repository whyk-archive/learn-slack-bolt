import { app } from '../initial';
import { UsersInfo } from '../../types/interface';

export default () => {
  app.event('member_joined_channel', async ({ event, context }) => {
    const userInfo = await app.client.users.info({
      token: context.botToken,
      user: event.user
    });
    const {user: {real_name}}: UsersInfo = userInfo;

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: `Welcome! ${real_name}`,
    });
  });
}
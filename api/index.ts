import { App, ExpressReceiver } from '@slack/bolt';
import { UsersInfo } from './types/interface';
import { titles } from './assets/json/movies.json'

export default () => {
  const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    endpoints: '/slack/events'
  })

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    receiver
  });

  app.message(':thinking_face:', async ({ message, say }) => {
    await say(`Oops!! <@${message.user}>`);
  });

  app.message(':memo:', async ({ message, context }) => {
    const title = titles.map(item => `タイトル：${item.name}、監督：${item.director}`).join('\n')
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      text: title
    })
  });

  app.message('yahoo!', async ({ message, say, context }) => {
    const user = await app.client.users.info({
      token: context.botToken,
      user: message.user
    })
    const {user: {real_name}}: UsersInfo = user

    await say(`hello! Mr.${real_name}`)
  })

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

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();
}

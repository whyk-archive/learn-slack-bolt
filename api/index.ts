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

  app.shortcut('open_modal', async ({shortcut, ack, context}) => {
    await ack();

    await app.client.views.open({
      token: context.botToken,
      trigger_id: shortcut.trigger_id,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: '投票作成',
          emoji: true
        },
        submit: {
          type: 'plain_text',
          text: '作成',
          emoji: true
        },
        close: {
          type: 'plain_text',
          text: 'キャンセル',
          emoji: true
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'これは投票機能です',
              emoji: true
            }
          },
          {
            type: 'divider'
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input'
            },
            label: {
              type: 'plain_text',
              text: 'タイトル',
              emoji: true
            }
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: '説明',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              multiline: true
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '期限'
            },
            accessory: {
              type: 'datepicker',
              initial_date: '1990-04-28',
              placeholder: {
                type: 'plain_text',
                text: 'Select a date',
                emoji: true
              }
            }
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: '選択肢1',
              emoji: true
            },
            element: {
              type: 'plain_text_input'
            }
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: '選択肢2',
              emoji: true
            },
            element: {
              type: 'plain_text_input'
            }
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: '選択肢3',
              emoji: true
            },
            element: {
              type: 'plain_text_input'
            }
          }
        ]
      }
    });
  });

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();
}

import { App, ExpressReceiver } from '@slack/bolt';
import { UsersInfo, VoteState } from './types/interface';
import { titles } from './assets/json/movies.json'

export default () => {
  const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    endpoints: '/slack/events'
  })

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    receiver,
    processBeforeResponse: true
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
        callback_id: 'vote_function',
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
            block_id: 'title',
            element: {
              type: 'plain_text_input',
              action_id: 'input_title'
            },
            label: {
              type: 'plain_text',
              text: 'タイトル',
              emoji: true
            }
          },
          {
            type: 'input',
            block_id: 'description',
            label: {
              type: 'plain_text',
              text: '説明',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              action_id: 'input_description',
              multiline: true
            }
          },
          {
            type: 'input',
            block_id: 'conversation',
            element: {
              type: 'conversations_select',
              action_id: 'input_conversation',
              placeholder: {
                type: 'plain_text',
                text: '投稿するチャンネルを選択する'
              }
            },
            label: {
              type: 'plain_text',
              text: 'チャンネル'
            }
          },
          {
            type: 'input',
            block_id: 'date',
            element: {
              type: 'datepicker',
              action_id: 'input_date',
              placeholder: {
                type: 'plain_text',
                text: '期限日を選択する',
                emoji: true
              }
            },
            label: {
              type: 'plain_text',
              text: '期限'
            }
          },
          {
            type: 'input',
            block_id: 'choices01',
            label: {
              type: 'plain_text',
              text: '選択肢1',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              action_id: 'input_choices01'
            }
          },
          {
            type: 'input',
            block_id: 'choices02',
            label: {
              type: 'plain_text',
              text: '選択肢2',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              action_id: 'input_choices02'
            }
          },
          {
            type: 'input',
            block_id: 'choices03',
            label: {
              type: 'plain_text',
              text: '選択肢3',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              action_id: 'input_choices03',
            }
          }
        ]
      }
    });
  });

  app.view('vote_function', async ({ack, view, context}) => {
    ack();

    const voteState: VoteState = view.state.values;

    console.log(voteState);

    const selectState = (key: keyof VoteState): string => {
      const value = ['conversation', 'date'].includes(key) ? `selected_${key}` : 'value'
      return voteState[key][`input_${key}`][value]
    };

    const text: string = `投票を行います。\n\n議題：${selectState('title')}\n概略：${selectState('description')}\n期限：${selectState('date')}\n\n選択肢 :1: ${selectState('choices01')}\n選択肢 :2: ${selectState('choices02')}\n選択肢 :3: ${selectState('choices03')}`;

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: selectState('conversation'),
      text,
      mrkdwn: true,
    });
  });

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();
}

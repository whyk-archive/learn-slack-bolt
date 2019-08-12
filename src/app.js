require('dotenv').config();

const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('hello', ({message, say}) => {
  say({
    blocks: [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `Hey there <@${message.user}>!`
        },
        'accessory': {
          'type': 'button',
          'text': {
            'type': 'plain_text',
            'text': 'click me'
          },
          'action_id': 'button_click'
        }
      }
    ]
  });
});

app.action('button_click', ({body, ack, say}) => {
  ack();
  say(`<@${body.user.id}> clicked the button`)
});

app.command('/echo', async ({command, ack, say}) => {
  ack();

  say(`${command.text}`);

});

app.error(error => {
  console.error(error);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
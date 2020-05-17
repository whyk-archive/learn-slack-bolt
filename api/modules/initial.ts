import { App, ExpressReceiver } from '@slack/bolt';

export const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: '/slack/events'
})

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  receiver,
  processBeforeResponse: true,
  endpoints: {
    events: '/slack/events',
    commands: '/slack/commands'
  }
});
import { app, receiver } from '../initial';

export default (): void => {
  receiver.app.get('/slack/cron', (req, res) => {
    res.sendStatus(200);
    app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: 'CM9JCP669',
      text: 'テスト完了！'
    });
  });
}
import { app } from './modules/initial';
import messageBlock from './modules/function/message';
import eventBlock from './modules/function/event';
import voteModal from './modules/function/voteModal';
import cron from './modules/function/cron';

export default () => {
  messageBlock();
  eventBlock();
  voteModal();
  cron();

  app.error( async err => {
    console.error(err);
  });

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();
}

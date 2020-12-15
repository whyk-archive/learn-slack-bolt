import { app } from './modules/initial';
import messageBlock from './modules/function/message';
import eventBlock from './modules/function/event';
import commandBlock from './modules/function/command';
import voteModal from './modules/function/voteModal';
import cron from './modules/function/cron';

export default (): void => {
  messageBlock();
  eventBlock();
  commandBlock();
  voteModal();
  cron();

  app.error( async err => {
    console.error(err);
  });

  (async (): Promise<void> => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();
}

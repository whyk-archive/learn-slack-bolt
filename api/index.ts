import app from './modules/initial';
import messageBlock from './modules/function/message';
import eventBlock from './modules/function/event';
import voteModal from './modules/function/voteModal';

export default () => {
  messageBlock();
  eventBlock();
  voteModal();

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();
}

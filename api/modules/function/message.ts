import app from '../initial';
import { UsersInfo } from '../../types/interface';
import { titles } from '../../assets/json/movies.json'

export default () => {
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
}
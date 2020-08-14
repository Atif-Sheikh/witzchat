import SendBirdCall from 'sendbird-calls';
import {APP_ID} from './user';

export const sbCallConnect = (userId, accessToken) => {
  SendBirdCall.init(APP_ID);
  // Authentication
  const authOption = {userId, accessToken};

  SendBirdCall.authenticate(authOption, (res, error) => {
    if (error) {
      // Authentication failed
      console.log('Authentication failed');
    } else {
      // Authentication succeeded
      console.log('Authentication succeeded');
      // Establishing websocket connection
      SendBirdCall.connectWebSocket()
        .then(() => {
          /* Succeeded to connect */
          console.log('Succeeded to connect');
        })
        .catch(() => {
          /* Failed to connect */
          console.log('Failed to connect');
        });
    }
  });
};

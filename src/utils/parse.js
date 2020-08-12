import AsyncStorage from '@react-native-community/async-storage';
const Parse = require('parse/react-native');

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize(
  'B0Ez8ncvCkqRmUcYeireo1PTMhOjsgyMW6GkQJ22', // Application ID
  '8Mwfk5Bnszt5LFT2NlPZMUeMO3mgs0HILiVkBW5w', // Javascript key
);

export default Parse;

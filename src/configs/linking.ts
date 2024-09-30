import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix, 'https://stemyb.thanhf.dev'],
  config: {
    screens: {
      OrderProgressScreen: 'order',
    },
  },
};

export default linking;

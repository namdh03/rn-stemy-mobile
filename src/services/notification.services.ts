import { graphql } from '~graphql';

export const DeactivatePushTokenMutation = graphql(`
  mutation DeactivatePushToken($deviceId: String!) {
    deactivatePushToken(deviceId: $deviceId)
  }
`);

export const SavePushTokenMutation = graphql(`
  mutation SavePushToken($deviceId: String!, $platform: String!, $token: String!) {
    savePushToken(deviceId: $deviceId, platform: $platform, token: $token) {
      id
    }
  }
`);

export const GetPushTokenQuery = graphql(`
  query GetPushToken($deviceId: String!) {
    getPushToken(deviceId: $deviceId) {
      id
    }
  }
`);

import { graphql } from '~graphql';

export const CreateFeedbackMutation = graphql(`
  mutation CreateFeedback($orderId: Float!, $input: [CreateFeedbackInput!]!) {
    createFeedback(orderId: $orderId, input: $input)
  }
`);

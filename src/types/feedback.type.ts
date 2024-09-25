export type UserFeedbackType = {
  __typename?: string;
  fullName: string;
};

export type ProductFeedbackType = {
  __typename?: string;
  comment: string;
  createdAt: string;
  id: string;
  rating: number;
  user: UserFeedbackType;
};

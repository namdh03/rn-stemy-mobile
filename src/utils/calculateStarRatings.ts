import { GetProductQuery } from '~graphql/graphql';

const calculateStarRatings = (feedbacks: GetProductQuery['product']['feedbacks']) => {
  const starCounts: { [key: string]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const totalFeedbacks = feedbacks.length;

  feedbacks.forEach((feedback) => {
    const rating = feedback.rating.toString();
    if (starCounts[rating] !== undefined) {
      starCounts[rating]++;
    }
  });

  // Calculate percentages
  const starPercentages = Object.keys(starCounts).map((star) => ({
    star: Number(star),
    count: starCounts[star],
    percentage: totalFeedbacks ? (starCounts[star] / totalFeedbacks) * 100 : 0,
  }));

  return starPercentages;
};

export default calculateStarRatings;

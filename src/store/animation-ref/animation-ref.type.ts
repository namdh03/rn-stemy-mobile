import { RefObject } from 'react';
import { View } from 'react-native';

export type AnimationRefState = {
  cartIconRef: RefObject<View> | null;
};

export type AnimationRefActions = {
  setCartIconRef: (ref: RefObject<View>) => void;
  reset: () => void;
};

export type AnimationRefSlice = AnimationRefState & AnimationRefActions;

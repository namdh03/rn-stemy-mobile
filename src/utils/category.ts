// id, title, bgColor, icon

import Bot from '~components/icons/Bot';
import CircleX from '~components/icons/CircleX';
import Laptop from '~components/icons/Laptop';
import SlidersVertical from '~components/icons/SlidersVertical';
import Wrench from '~components/icons/Wrench';

const category = [
  {
    id: 0,
    title: 'Not found',
    icon: CircleX,
    bgColor: '#fecaca',
    colorIcon: '#dc2626',
  },
  {
    id: 1,
    title: 'Robot',
    icon: Bot,
    bgColor: '#E4F3EA',
    colorIcon: '#009B77',
  },
  {
    id: 2,
    title: 'Programming',
    icon: Laptop,
    bgColor: '#FFECE8',
    colorIcon: '#F88D3F',
  },
  {
    id: 3,
    title: 'Module',
    icon: SlidersVertical,
    bgColor: '#FFF6E4',
    colorIcon: '#FFD233',
  },
  {
    id: 4,
    title: 'Accessory',
    icon: Wrench,
    bgColor: '#F1EDFC',
    colorIcon: '#9B81E5',
  },
];

export default category;

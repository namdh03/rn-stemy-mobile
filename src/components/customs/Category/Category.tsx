import { View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { useShallow } from 'zustand/react/shallow';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { RootBottomTabsParamList } from '~types/navigation.type';

interface CateProps {
  id: string;
  icon: LucideIcon;
  title: string;
  bgColor: string;
  colorIcon: string;
}

const Category = ({ id, icon: Icon, title, bgColor, colorIcon }: CateProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootBottomTabsParamList>>();
  const { setFilterSorting } = useStore(
    useShallow((state) => ({
      setFilterSorting: state.setFilterSorting,
    })),
  );

  const handlePress = () => {
    setFilterSorting({ categoryIds: [+id] });
    navigation.navigate('StoresScreen');
  };

  return (
    <View className='flex justify-center items-center gap-[10px]'>
      <Button
        className='w-[48px] h-[48px] p-[8px] rounded-[10px]'
        style={{ backgroundColor: bgColor }}
        onPress={handlePress}
      >
        <Icon className='w-[24px] h-[24px]' color={colorIcon} />
      </Button>
      <Text className='font-inter-regular text-[14px] leading-[20px] text-foreground text-center'>{title}</Text>
    </View>
  );
};

export default Category;

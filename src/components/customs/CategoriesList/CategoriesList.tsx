import React from 'react';
import { View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import { Bot, CircleX, Laptop, SlidersVertical, Wrench } from '~components/icons';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetProductCategoriesQuery } from '~services/category.services';

import Category from '../Category';

interface CategoryType {
  id: string;
  name: string;
  title: string;
  type: string;
}

const CategoriesList = () => {
  const { data, isFetching } = useQuery({
    queryKey: [constants.CATEGORY_QUERY_KEY.GET_PRODUCT_CATEGORIES_QUERY_KEY],
    queryFn: () => execute(GetProductCategoriesQuery),
    select: (data) => data.data,
  });

  if (isFetching) {
    return <LoadingOverlay loop />;
  }

  const filteredCategories =
    data?.productCategories?.filter((category: CategoryType) => category.type === 'TOPIC').slice(0, 4) || [];

  const renderCategory = (category: CategoryType) => {
    switch (category.name) {
      case 'Robot':
        return <Category id={category.id} title={category.name} bgColor='#E4F3EA' icon={Bot} colorIcon='#009B77' />;
      case 'Programming':
        return <Category id={category.id} title={category.name} bgColor='#FFECE8' icon={Laptop} colorIcon='#F88D3F' />;
      case 'Module':
        return (
          <Category
            id={category.id}
            title={category.name}
            bgColor='#FFF6E4'
            icon={SlidersVertical}
            colorIcon='#FFD233'
          />
        );
      case 'Accessory':
        return <Category id={category.id} title={category.name} bgColor='#FFF6E4' icon={Wrench} colorIcon='#FFD233' />;
      default:
        return <Category id={category.id} title={category.name} bgColor='#fecaca' icon={CircleX} colorIcon='#dc2626' />;
    }
  };

  return (
    <>
      {filteredCategories.map((category: CategoryType, index: number) => (
        <View key={index}>{renderCategory(category)}</View>
      ))}
    </>
  );
};

export default CategoriesList;

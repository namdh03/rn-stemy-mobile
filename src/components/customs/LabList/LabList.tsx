import { FlatList, Text } from 'react-native';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~components/ui/accordion';
import { GetMyPurchasesQuery } from '~graphql/graphql';

import EmptyList from '../EmptyList';
import LabComponent from '../LabComponent';

interface LabListProps {
  data: GetMyPurchasesQuery['searchOrder'][number];
  hiddenProductId?: string;
  onPress?: () => void;
}

const LabList = ({ data }: LabListProps) => {
  const renderItem = ({ item }: { item: GetMyPurchasesQuery['searchOrder'][number]['orderItems'][number] }) => {
    if (!item.userLab) return null;

    return (
      <AccordionContent>
        <LabComponent
          id={item.id}
          imageUrl={item.product.images[0]?.url}
          title={item.product.name}
          purchaseDate={new Date(item.userLab.createdAt)}
          numberOfTicket={item.tickets.length}
          status={item.userLab.isActive}
          fileLink={item.id}
          activeDate={item.userLab.updatedAt ? new Date(item.userLab.updatedAt) : undefined}
        />
      </AccordionContent>
    );
  };

  return (
    <Accordion type='multiple' collapsible defaultValue={['item-1']} className='w-full px-3 bg-white my-3'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <Text className='font-inter-medium text-[14px] w-[250px]'>
            Order ID: <Text className='text-muted-foreground'>{btoa(btoa(btoa(btoa(data.id))))}</Text>
          </Text>
        </AccordionTrigger>
        {data.orderItems.filter((item) => item.userLab !== null).length === 0 ? (
          <AccordionContent>
            <EmptyList message='No Lab in this order' />
          </AccordionContent>
        ) : (
          <FlatList
            data={data.orderItems.filter((item) => item.userLab !== null)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default LabList;

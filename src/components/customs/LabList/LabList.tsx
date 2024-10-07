import { FlatList, ImageSourcePropType, Text } from 'react-native';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~components/ui/accordion';

import LabComponent from '../LabComponent';

type LabComponentProps = {
  id: string;
  imageUrl: ImageSourcePropType | string;
  title: string;
  purchaseDate: Date;
  numberOfTicket: number;
  status: boolean;
  activeDate?: Date;
  message?: string;
  fileLink: string;
};

type getLabListQuery = {
  orderId: string;
  lab: LabComponentProps[];
};

interface LabListProps {
  data: getLabListQuery;
  hiddenProductId?: string;
  onPress?: () => void;
}

const LabList = ({ data }: LabListProps) => {
  const renderItem = ({ item }: { item: LabComponentProps }) => {
    return (
      <AccordionContent>
        <LabComponent
          id={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          purchaseDate={item.purchaseDate}
          numberOfTicket={item.numberOfTicket}
          status={item.status}
          fileLink={item.fileLink}
          activeDate={item.activeDate}
          message={item.message}
        />
      </AccordionContent>
    );
  };

  return (
    <Accordion type='multiple' collapsible defaultValue={['item-1']} className='w-full px-3 bg-white my-3'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <Text className='font-inter-medium text-[16px] w-[200px]'>
            Order ID: <Text className='text-muted-foreground'>{data.orderId}</Text>
          </Text>
        </AccordionTrigger>

        <FlatList
          data={data.lab}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </AccordionItem>
    </Accordion>
  );
};

export default LabList;

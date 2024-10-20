import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import { Badge } from '~components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/ui/tabs';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { TicketStatus } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetStaffTicketsByStatusQuery } from '~services/ticket.services';

import TicketList from './components/TicketList';

const SupportScreen = () => {
  const [value, setValue] = useState<TicketStatus>(TicketStatus.Open);
  const { data, refetch, isLoading } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_STAFF_TICKET_BY_STATUS_QUERY_KEY, value],
    queryFn: () => execute(GetStaffTicketsByStatusQuery, { status: value }),
    select: (data) => data.data.myTickets,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const listSorted = useMemo(() => {
    return [...(data || [])].sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt).getTime();
      const dateB = new Date(a.updatedAt || a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [data]);

  return (
    <View className='gap-[16px] p-[25px] py-[30px] mx-auto w-full max-w-xl'>
      <Tabs
        value={value}
        onValueChange={(value) => setValue(value as TicketStatus)}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full bg-[#16A34A1A]'>
          <TabsTrigger value={TicketStatus.Open} className='flex-1'>
            <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>Open</Text>
          </TabsTrigger>
          <TabsTrigger value={TicketStatus.Close} className='flex-1'>
            <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
              Closed
            </Text>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TicketStatus.Open} className='mt-[14px] h-full'>
          <View className='flex-row gap-[8px] mb-[18px]'>
            <Text className='font-inter-bold text-foreground text-[14px]'>New ticket</Text>
            <Badge>
              <Text className='font-inter-semiBold text-[10px] tracking-[0.2px]'>{listSorted.length}</Text>
            </Badge>
          </View>

          <TicketList
            isLoading={isLoading}
            data={listSorted}
            isRefetch={isRefetchingByUser}
            refetch={refetchByUser}
            status={value}
          />
        </TabsContent>

        <TabsContent value={TicketStatus.Close} className='mt-[14px] h-full'>
          <View className='flex-row gap-[8px] mb-[18px]'>
            <Text className='font-inter-bold text-foreground text-[14px]'>Close ticket</Text>
            <Badge>
              <Text className='font-inter-semiBold text-[10px] tracking-[0.2px]'>{listSorted.length}</Text>
            </Badge>
          </View>

          <TicketList
            isLoading={isLoading}
            data={listSorted}
            isRefetch={isRefetchingByUser}
            refetch={refetchByUser}
            status={value}
          />
        </TabsContent>
      </Tabs>
    </View>
  );
};

export default SupportScreen;

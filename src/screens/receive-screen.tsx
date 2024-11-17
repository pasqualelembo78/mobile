import { FlatList, StyleSheet, Text } from 'react-native';

import { AddressItem, ScreenLayout, Separator } from '@/components';
import { Address } from '@/types';

interface Props {}

export const ReceiveScreen: React.FC<Props> = () => {

  const addresses = [
    {address: 'SEKReYFsoia2ftjRANiRyoTQ4CMxuTMQTUD8oLYwXKiPFKJuDJbnPhJCfUAu1NpFn7Hf3khtfEE7wXQ1JAnJVPfSff9WfueaduZ', balance: 123536630},
    {address: 'SEKReTBEUpUGmpggB6iYj9fPwod95YAR6imRmRQTaS1bj7SraEThxmUKvjXJcgatqoRKY1V4qmLiuTbZDj2v2c6iUwth8brrCoG', balance: 123536630},
    {address: 'SEKReTvCzw7UxtujDaDsou3AS9Bsve9UsXHy8CvuBSCeNoZPs8afknc4CDgUYJoaS7cBxdu2v8DNZ2dvMXdwjYzXM7QrphbZP9a', balance: 123536630},
    {address: 'SEKReU1ozFAiYLKrmSELVD1Jx2jGkFv7LehRb2cjeDKuYGn4KwUNRsmjTf3pXwdFT7PcBBCPyfzo2i1w2gLqNM2nDX9sPh4uBqV', balance: 123536630},
    {address: 'SEKReWAWJYoFnSFd9bQ8V14sbAG6NkvZvhsmWwN6qvzW8sF95DyP36E6GnwbSyWm4GAUehfmrKe37aicAuXfVXq4jJQ4BMxE4JW', balance: 123536630}
  ]
  const address = addresses[0];

  const addressesCB = ({ item }: { item: Address }) => {

    return <AddressItem {...item} />;

  }

  return (
    <ScreenLayout>
      <FlatList
              nestedScrollEnabled={true}
              numColumns={1}
              data={addresses}
              renderItem={addressesCB}
              keyExtractor={(item, i) => `${item.address}-${i}`}
              ItemSeparatorComponent={Separator}
            />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white'
  }
})
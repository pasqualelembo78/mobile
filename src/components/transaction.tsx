import { useState } from 'react';

import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { nameMaxLength } from '@/config';
import type { Transaction } from '@/types';

import { Avatar, TextField } from './_elements';

type Props = Transaction;

export const TransactionItem: React.FC<Props> = ({ hash, amount }) => {
  const [pressed, setPressed] = useState(false);

  function onPress() {
    setPressed(!pressed);
  }

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={styles.content}>
      <TextField size="xsmall" maxLength={nameMaxLength}>
        {hash.slice(0,10)}..{hash.slice(-10)}
      </TextField>
      <TextField size="xsmall" maxLength={nameMaxLength}>
        {amount/100000}
      </TextField>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: { 
    width: '100%',
    padding: 5
 },
  onlineUser: {
    flexDirection: 'row',
    margin: 1,
    marginBottom: 4,
  },
  content: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Push hash to the left and amount to the right
    alignItems: 'center', // Vertically align the items
    width: '100%', // Ensure content spans the full width
  },
});

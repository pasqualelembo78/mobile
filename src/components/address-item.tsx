import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard'; // Install this library if not available
import { nameMaxLength } from '@/config';
import type { Address } from '@/types';
import { Avatar, TextField } from './_elements';
import Toast from 'react-native-toast-message'; 

type Props = Address;

export const AddressItem: React.FC<Props> = ({ address, balance }) => {
  const [pressed, setPressed] = useState(false);

  const onPress = () => {
    Clipboard.setString(address); // Copy the address to clipboard
    Toast.show({
      type: 'success',
      text1: 'Copied to Clipboard',
      text2: `${address}...`,
      position: 'bottom',
    }); // Show the toast
    setPressed(!pressed);
  };

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.content}>
        <TextField size="xsmall">
          {address.slice(0, 10)}..{address.slice(-10)}
        </TextField>
        <TextField size="xsmall">{balance / 100000}</TextField>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    padding: 5,
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

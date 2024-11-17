import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScreenLayout } from '@/components';

interface Props {}

export const SendScreen: React.FC<Props> = () => {
  // Form states
  const [address, setAddress] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
  const [sendAll, setSendAll] = useState(false);

  // Placeholder function for address paste
  const pasteAddress = () => {
    setAddress('SEKReTBEUpUGmpggB6iYj9fPwod95YAR6imRmRQTaS1bj7SraEThxmUKvjXJcgatqoRKY1V4qmLiuTbZDj2v2c6iUwth8brrCoG');
  };

  // Placeholder function for generating payment ID
  const generatePaymentId = () => {
    setPaymentId('GeneratedPaymentId123');
  };

  // Placeholder function for max amount
  const sendMaxAmount = () => {
    setAmount('1.2345');
    setSendAll(true);
  };

  // Placeholder transaction data
  const preparedTransaction = {
    address: 'SEKReTBEUpUGmpggB6iYj9fPwod95YAR6imRmRQTaS1bj7SraEThxmUKvjXJcgatqoRKY1V4qmLiuTbZDj2v2c6iUwth8brrCoG',
    paymentId: null,
    amount: 1.2345,
    fee: 0.0001,
  };

  return (
    <ScreenLayout>
      <View style={styles.wrapper}>
        {/* Form */}
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#888"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.button} onPress={pasteAddress}>
            <Text style={styles.buttonText}>Paste</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="Payment ID (optional)"
            placeholderTextColor="#888"
            value={paymentId}
            onChangeText={setPaymentId}
          />
          <TouchableOpacity style={styles.button} onPress={generatePaymentId}>
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.field, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Amount"
            placeholderTextColor="#888"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity style={[styles.button, { marginLeft: 8 }]} onPress={sendMaxAmount}>
            <Text style={styles.buttonText}>Max</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Details */}
        {preparedTransaction ? (
          <View style={styles.transactionBox}>
            <Text style={styles.heading}>Receiving Address</Text>
            <Text style={styles.detail}>
              {preparedTransaction.address.slice(0, 24)}...{preparedTransaction.address.slice(-24)}
            </Text>

            <Text style={styles.heading}>Payment ID</Text>
            <Text style={styles.detail}>
              {preparedTransaction.paymentId ? preparedTransaction.paymentId : 'Not Applicable'}
            </Text>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.heading}>Total Amount</Text>
                <Text style={styles.detail}>{preparedTransaction.amount}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.heading}>Fee</Text>
                <Text style={styles.detail}>{preparedTransaction.fee}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.transactionBox, styles.noTransaction]}>
            <Text style={styles.detail}>No prepared transactions 👻</Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#222',
    width: '100%',
  },
  noTransaction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  detail: {
    fontSize: 14,
    color: '#00ffcc',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  column: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

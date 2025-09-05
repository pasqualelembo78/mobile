import React, { useLayoutEffect, useState } from 'react';

import { FlatList, TouchableOpacity, View } from 'react-native';

import { useNavigation, type RouteProp } from '@react-navigation/native';
import { Daemon, WalletBackend } from 'mevacoin-backend-wallet';
import { useTranslation } from 'react-i18next';

import {
  Container,
  CustomIcon,
  InputField,
  ModalCenter,
  PreviewItem,
  ScreenLayout,
  TextButton,
  TextField,
} from '@/components';
import { MainScreens } from '@/config';
import { setStoreCurrentRoom, useGlobalStore, useUserStore } from '@/services';
import type { MainStackNavigationType, MainNavigationParamList } from '@/types';

import { Header } from '../components/_navigation/header';

interface Props {
  route: RouteProp<MainNavigationParamList, typeof MainScreens.GroupsScreen>;
}

export const GroupsScreen: React.FC<Props> = () => {
  //TODO** rename Groups -> Rooms
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const navigation = useNavigation<MainStackNavigationType>();
  const rooms = useGlobalStore((state) => state.rooms);
  const [modalVisible, setModalVisible] = useState(false);
  const [joining, setJoinVisible] = useState(false);
  const [link, setLink] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={t('rooms')}
          right={
            <TouchableOpacity onPress={onAddGroupPress}>
              <CustomIcon type="IO" name="add-outline" size={30} />
            </TouchableOpacity>
          }
        />
      ),
    });
  }, [navigation]);

  function onAddGroupPress() {
    wallet();
  }

  // Function to test wallet support for different JS engines
  const wallet = async () => {
    const daemon = new Daemon('privacymine.net', 11898);
    const config = {};
    const wallet = await WalletBackend.createWallet(daemon, config);
    console.log('Wallet!', wallet);
  };

  async function onPress(roomKey: string, name: string) {
    setStoreCurrentRoom(roomKey);
    navigation.navigate(MainScreens.GroupChatScreen, { name, roomKey });
  }

  function onCloseModal() {
    setModalVisible(false);
    setJoinVisible(false);
  }

  function onJoinPress() {
    setJoinVisible(true);
  }

  function onCreateRoom() {
    setModalVisible(false);
    navigation.navigate(MainScreens.AddGroupScreen);
  }

  function onInputChange(text: string) {
    setLink(text);
  }

  function onJoinpress() {
    const inviteKey = link.slice(-128);
    const parse = link.split('hugin://')[1];
    const roomName = parse.slice(0, parse.length - 1 - inviteKey.length);

    if (inviteKey && roomName && user?.address) {
      setModalVisible(false);

      navigation.navigate(MainScreens.GroupChatScreen, {
        name: roomName,
        roomKey: inviteKey,
      });
    }
  }

  return (
    <ScreenLayout>
      <ModalCenter visible={modalVisible} closeModal={onCloseModal}>
        {joining && (
          <View style={styles.inviteContainer}>
            <InputField
              label={t('inviteLink')}
              value={link}
              onChange={onInputChange}
              onSubmitEditing={onJoinpress}
            />
            <TextButton onPress={onJoinpress}>{t('joinRoom')}</TextButton>
          </View>
        )}

        {!joining && (
          <View>
            <TextField size="small">{t('createRoomDescr')}</TextField>
            <TextButton onPress={onCreateRoom}>{t('createRoom')}</TextButton>
            <View style={styles.divider} />
            <TextField size="small">{t('joinRoomDescr')}</TextField>
            <TextButton onPress={onJoinPress}>{t('joinRoom')}</TextButton>
          </View>
        )}
      </ModalCenter>
      {rooms.length === 0 && (
        <Container>
          <TextField size="large">{t('emptyAddressBook')}</TextField>
        </Container>
      )}
      <FlatList
        data={rooms}
        keyExtractor={(item, i) => `${item.roomKey}-${i}`}
        renderItem={({ item }) => <PreviewItem {...item} onPress={onPress} />}
      />
    </ScreenLayout>
  );
};

const styles = {
  divider: {
    marginVertical: 10,
  },
  inviteContainer: {
    // backgroundColor: 'red',
  },
};

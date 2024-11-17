import {
  AddGroupScreen,
  ChangeLanguageScreen,
  ChangeThemeScreen,
  GroupChatScreen,
  GroupsScreen,
  MainScreen,
  ModifyGroupScreen,
  SettingsScreen,
  UpdateProfileScreen,
  ReceiveScreen,
  SendScreen,
  HistoryScreen
} from '@/screens';
import { MainScreens, TabBar } from '@/config';

import { Header } from '../header';
import { MainNavigationParamList } from '@/types';
import { MyTabBar } from '../tab-bar';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';

const Tab = createBottomTabNavigator<MainNavigationParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <MyTabBar {...props} />}>
      {/* // Wallet */}

      <Tab.Screen
        name={MainScreens.MainScreen}
        component={MainScreen}
        options={() => ({
          header: (_props) => <Header title={t('dashboard')} />, // More actions handled in screen
        })}
      />

      <Tab.Screen
        name={MainScreens.ReceiveScreen}
        component={ReceiveScreen}
        options={() => ({
          header: (_props) => <Header title={t('receive')} />, // More actions handled in screen
        })}
      /> 

      <Tab.Screen
        name={MainScreens.HistoryScreen}
        component={HistoryScreen}
        options={() => ({
          header: (_props) => <Header title={t('history')} />, // More actions handled in screen
        })}
      /> 

      <Tab.Screen
        name={MainScreens.SendScreen}
        component={SendScreen}
        options={() => ({
          header: (_props) => <Header title={t('send')} />, // More actions handled in screen
        })}
      />

      {/* // Settings */}

      <Tab.Screen
        name={MainScreens.SettingsScreen}
        component={SettingsScreen}
        options={() => ({
          header: (_props) => <Header title={t('settingsTitle')} />,
        })}
      />
      <Tab.Screen
        name={MainScreens.ChangeLanguageScreen}
        component={ChangeLanguageScreen}
        options={() => ({
          header: (_props) => <Header title={t('changeLanguage')} backButton />,
        })}
      />
      <Tab.Screen
        name={MainScreens.UpdateProfileScreen}
        component={UpdateProfileScreen}
        options={() => ({
          header: (_props) => <Header title={t('updateProfile')} backButton />,
        })}
      />
      <Tab.Screen
        name={MainScreens.ChangeThemeScreen}
        component={ChangeThemeScreen}
        options={() => ({
          header: (_props) => <Header title={t('changeTheme')} backButton />,
        })}
      />
    </Tab.Navigator>
  );
};

export enum AuthScreens {
  ForgotPinScreen = 'ForgotPinScreen',
  RequestFingerPrintScreen = 'RequestFingerPrintScreen',
  RequestPinScreen = 'RequestPinScreen',
  SetPinScreen = 'SetPinScreen',
  SplashScreen = 'SplashScreen',
  CreateAccountScreen = 'CreateAccountScreen',
}

export const TabBar = {
  MainScreen: {
    iconName: 'view-dashboard',
    iconType: 'MCI',
    tabName: 'MainTab',
  },
  GroupsScreen: {
    iconName: 'comment-text-multiple-outline',
    iconType: 'MCI',
    tabName: 'GroupsTab',
  },
  // MessagesTab: {
  //   iconName: 'comment-text-outline',
  //   iconType: 'MCI',
  //   tabName: 'MessagesTab',
  // },
  SettingsScreen: {
    iconName: 'sliders',
    iconType: 'FA',
    tabName: 'SettingsTab',
  },
} as const;

export enum Stacks {
  MainStack = 'MainStack',
  AuthStack = 'AuthStack',
}

export enum MainScreens {
  MainScreen = 'MainScreen',
  AddGroupScreen = 'AddGroupScreen',
  GroupChatScreen = 'GroupChatScreen',
  GroupsScreen = 'GroupsScreen',
  ModifyGroupScreen = 'ModifyGroupScreen',
  MessageScreen = 'MessageScreen',
  MessagesScreen = 'MessagesScreen',
  ChangeLanguageScreen = 'ChangeLanguageScreen',
  ChangeThemeScreen = 'ChangeThemeScreen',
  FaqScreen = 'FaqScreen',
  SettingsScreen = 'SettingsScreen',
  UpdateProfileScreen = 'UpdateProfileScreen',
}

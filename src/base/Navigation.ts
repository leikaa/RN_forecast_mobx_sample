import { NavigationContainerRef } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';
import * as React from 'react';

import { Stacks } from '../navigation/consts/stacks';

export interface NavigationParams {
  [key: string]: any;
}

export default class Navigation {
  static navigationRef = React.createRef<NavigationContainerRef<any>>();

  static initialRoute: string = Stacks.HOME_STACK;

  static getCurrentRouteName = () => {
    return this.navigationRef.current?.getCurrentRoute()?.name;
  };

  static push = (routeName: string, params?: NavigationParams) => {
    setTimeout(() => this.navigationRef.current?.dispatch(StackActions.push(routeName, params)), 0);
  };

  static navigate = <ParamList extends {}>(
    routeName: string | keyof ParamList,
    params?: ParamList[keyof ParamList] | { screen: keyof ParamList; params?: ParamList[keyof ParamList] },
  ) => {
    // https://github.com/react-navigation/react-navigation/issues/6879
    setTimeout(() => this.navigationRef.current?.navigate(routeName, params), 0);
  };

  static replace = (routeName: string, params?: NavigationParams) => {
    // https://github.com/react-navigation/react-navigation/issues/6879
    setTimeout(
      () =>
        this.navigationRef.current?.reset({
          index: 0,
          routes: [{ name: routeName, params: params }],
        }),
      0,
    );
  };

  static pop = () => {
    this.navigationRef.current?.goBack();
  };
}

import { observer } from 'mobx-react';
import React, { useRef } from 'react';
import { TextInputProps, View } from 'react-native';

import { appConfig } from '../appConfig';
import { useRootStore } from '../base/hooks/useRootStore';
import { SearchIcon } from '../components/icons/SearchIcon';
import { Input } from '../components/ui/Input';
import DebounceHelper from '../helpers/DebounceHelper';

interface ISearchFieldProps extends TextInputProps {
  debounceAction?: (text: string) => void;
}

export const SearchField = observer((props: ISearchFieldProps) => {
  const { searchStore } = useRootStore();

  let searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleOnTextChange = (text: string) => {
    searchStore.setSearchQuery(text);

    if (props.debounceAction) {
      searchTimer.current = DebounceHelper.debounce(
        searchTimer?.current,
        () => props.debounceAction!(text.trim()),
        appConfig.searchDelay,
      );
    }
  };

  return (
    <View style={props.style}>
      <Input
        value={searchStore.searchQuery}
        onChangeText={handleOnTextChange}
        rightComponent={<SearchIcon />}
        {...props}
      />
    </View>
  );
});

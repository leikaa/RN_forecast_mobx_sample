import React, { useState, Ref, forwardRef, useRef } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { appConfig } from '../appConfig';
import DebounceHelper from '../helpers/DebounceHelper';
import { SearchIcon } from './icons/SearchIcon';
import { Input } from './ui/Input';

interface ISearchFieldProps extends TextInputProps {
  debounceAction?: (text: string) => void;
}

export const SearchField = forwardRef((props: ISearchFieldProps, searchRef: Ref<TextInput>) => {
  let searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const [query, setQuery] = useState('');

  const handleOnTextChange = (text: string) => {
    setQuery(text);

    const trimmedText = text.trim();

    if (props.debounceAction && query.trim() !== trimmedText) {
      searchTimer.current = DebounceHelper.debounce(
        searchTimer?.current,
        () => props.debounceAction!(trimmedText),
        appConfig.searchDelay,
      );
    }
  };

  return (
    <View style={props.style}>
      <Input
        ref={searchRef}
        value={query}
        onChangeText={handleOnTextChange}
        rightComponent={<SearchIcon />}
        {...props}
      />
    </View>
  );
});

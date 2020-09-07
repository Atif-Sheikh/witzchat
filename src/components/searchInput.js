import React from 'react';
import { Item, Icon, Input } from 'native-base';
import colors from '../constants/colors';

const SearchInput = ({ value, onChangeText }) => {
  return (
    <Item
      style={{
        backgroundColor: colors.lightGrey,
        paddingHorizontal: 10,
        borderBottomWidth: 0,
      }}
    >
      <Icon name="search" type="FontAwesome5" color={colors.grey} />
      <Input placeholder="Search" value={value} onChangeText={onChangeText} />
    </Item>
  );
};

export default SearchInput;

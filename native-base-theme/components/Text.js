// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#a7a7a7',
      fontSize: variables.noteFontSize,
    },
    '.gray': {
      color: variables.brandGray,
    },
    '.primary': {
      color: variables.brandPrimary,
    },
    '.heading':{
      fontWeight: 'bold'
    }
  };

  return textTheme;
};

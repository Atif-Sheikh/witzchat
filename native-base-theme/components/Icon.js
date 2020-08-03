// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: variables.textColor,
    '.primary': {
      color: variables.brandPrimary,
    },
    '.small': {
      fontSize: 12,
      alignSelf: 'center',
      marginRight: 5,
    },
  };

  return iconTheme;
};

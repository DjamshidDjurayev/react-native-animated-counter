import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomText from '../CustomText';
import { toDp } from '../../../utils/screenUtils';
import fontHelper from '../../../utils/fontHelper';

class Ticker extends Component {
  static propTypes = {
    value: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    height: 50,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  render() {
    const { value, height } = this.props;

    return (
      <CustomText
        font={fontHelper.OpenSansSemiBold}
        title={`${value}`}
        textSize={22}
        style={{
          height: toDp(height),
          lineHeight: toDp(height),
        }}
        numberOfLines={1}
        containerStyle={styles.ticker}
      />
    );
  }
}

const styles = EStyleSheet.create({
  ticker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Ticker;

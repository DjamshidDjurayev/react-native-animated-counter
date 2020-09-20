import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ticker from './Ticker';
import PropTypes from 'prop-types';
import { toDp } from '../../../utils/screenUtils';

class NumberTicker extends Component {
  static propTypes = {
    height: PropTypes.number,
  };

  static defaultProps = {
    height: 50,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.numbers = [0];
    this.counter = 0;
    this.animatedValue = new Animated.Value(
      this.getPosition(this.state.value, toDp(props.height)),
    );
    this.animating = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      // increment animation
      this.animating = true;

      Animated.timing(this.animatedValue, {
        duration: 200,
        toValue: this.getPosition(this.state.value, toDp(this.props.height)),
        easing: Easing.elastic(0.5),
      }).start(() => {
        if (prevState.value > this.state.value) {
          this.numbers.pop();
        }
        this.animating = false;
      });
    }
  }

  render() {
    const { height } = this.props;

    return (
      <View style={styles.rootView}>
        <View
          style={[
            styles.hidden,
            {
              height: toDp(height),
            },
          ]}>
          <Animated.View
            style={[
              styles.tickerContainer,
              {
                transform: [
                  {
                    translateY: this.animatedValue,
                  },
                ],
              },
            ]}>
            {this.numbers.map((item, index) => {
              return <Ticker value={item} key={`${index}`} height={height} />;
            })}
          </Animated.View>
        </View>
      </View>
    );
  }

  getPosition = (value, height) => {
    return parseInt(value, 10) * height * -1;
  };

  incrementCounter = () => {
    if (this.animating) {
      return;
    }

    this.numbers.push(this.state.value + 1);

    this.setState({
      value: this.state.value + 1,
    });
  };

  decrementCounter = () => {
    if (this.animating) {
      return;
    }

    if (this.state.value === 0) {
      return;
    }

    this.setState({
      value: this.state.value - 1,
    });
  };

  getCounterValue = () => {
    return this.state.value;
  };

  componentWillUnmount() {
    this.numbers = undefined;
  }
}

const styles = EStyleSheet.create({
  rootView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    overflow: 'hidden',
  },
  tickerContainer: {
    width: '60rem',
  },
});

export default NumberTicker;

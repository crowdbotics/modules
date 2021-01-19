import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;
const scaleModerate = (size, factor = 0.5) => size + ((scale(size) - size) * factor);

export { scale, scaleVertical, scaleModerate };

import PropTypes from 'prop-types';

const shape = (propShape) => PropTypes.shape(propShape);

const functionTypes = {
  goBack: PropTypes.func,
  navigate: PropTypes.func,
};

export const NavigationType = shape({
  goBack: functionTypes.goBack.isRequired,
  navigate: functionTypes.navigate.isRequired,
});

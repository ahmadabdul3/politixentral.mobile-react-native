import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions } from 'react-native';

export default class ScaledImage extends PureComponent {
  static propTypes = {
    uri: PropTypes.string,
    fullWidth: PropTypes.bool,
    maxHeight: PropTypes.number,
  };

  state = {
    width: 0,
    height: 0,
  };

  getHeight({ imageHeight, windowWidth, imageWidth }) {
    const { maxHeight } = this.props;
    let height = imageHeight * (windowWidth * 0.97 / imageWidth);
    if (maxHeight && imageHeight > maxHeight) return maxHeight;
    return height;
  }

  componentWillMount() {
    const { uri, fullWidth } = this.props;
    const windowWidth = Dimensions.get('window').width;

    Image.getSize(uri, (imageWidth, imageHeight) => {
      let width = '';

      if (fullWidth) width = windowWidth;
      else width = windowWidth * 0.97;

      const height = this.getHeight({ imageHeight, windowWidth, imageWidth });

      this.setState({ width, height });
    });
  }

  render() {
    const { width, height } = this.state;

    return (
      <Image
        source={{ uri: this.props.uri }}
        style={{ width, height }}
        resizeMode='cover'
      />
    );
  }
}

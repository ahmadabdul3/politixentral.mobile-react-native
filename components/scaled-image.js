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
    if (maxHeight && imageHeight > maxHeight) return maxHeight;

    let height = imageHeight * (windowWidth * 0.97 / imageWidth);
    return height;
  }

  getWidth() {
    const { maxWidth, fullWidth } = this.props;
    if (maxWidth) return maxWidth;

    const windowWidth = Dimensions.get('window').width;
    if (fullWidth) return windowWidth;
    return windowWidth * 0.97;
  }

  componentWillMount() {
    const { uri } = this.props;

    Image.getSize(uri, (imageWidth, imageHeight) => {
      const windowWidth = Dimensions.get('window').width;
      const height = this.getHeight({ imageHeight, windowWidth, imageWidth });
      const width = this.getWidth();

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

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

  getHeight({ imageHeight, windowWidth, imageWidth, width }) {
    const { maxHeight } = this.props;
    if (!!maxHeight && imageHeight > maxHeight) return maxHeight;

    let height = imageHeight * (width / imageWidth);
    return height;
  }

  getWidth(windowWidth) {
    const { maxWidth, fullWidth } = this.props;
    if (!!maxWidth) return maxWidth;
    if (!!fullWidth) return windowWidth;
    return windowWidth * 0.97;
  }

  componentWillMount() {
    const { uri } = this.props;

    Image.getSize(uri, (imageWidth, imageHeight) => {
      const windowWidth = Dimensions.get('window').width;
      const width = this.getWidth(windowWidth);
      const height = this.getHeight({
        imageHeight, windowWidth, imageWidth, width
      });

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

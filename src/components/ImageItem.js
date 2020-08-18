import React, {Component} from 'react';
import {Image, View, Modal, TouchableOpacity, StatusBar} from 'react-native';
import {Button, Icon} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import colors from '../constants/colors';

class ImageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      isMounted: false,
      showModal: false,
    };
  }

  componentDidMount() {
    this.setState(
      {
        isMounted: true,
      },
      () => {
        Image.getSize(this.props.message, (width, height) => {
          const {resizeWidth, resizeHeight} = this._imageResize(width, height);
          if (this.state.isMounted)
            this.setState({width: resizeWidth, height: resizeHeight});
        });
      },
    );
  }
  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
  }

  _imageResize = (width, height) => {
    const IMAGE_MAX_SIZE = 160;
    const scaleWidth = IMAGE_MAX_SIZE / width;
    const scaleHeight = IMAGE_MAX_SIZE / height;

    let scale = scaleWidth <= scaleHeight ? scaleWidth : scaleHeight;
    if (scale > 1) {
      scale = 1;
    }

    const resizeWidth = width * scale;
    const resizeHeight = height * scale;
    return {resizeWidth: resizeWidth, resizeHeight: resizeHeight};
  };

  render() {
    return (
      <View style={{}}>
        <TouchableOpacity onPress={() => this.setState({showModal: true})}>
          <Image
            // style={{ width: this.state.width, height: this.state.height }}
            style={{width: '100%', height: this.state.height}}
            source={{uri: this.props.message}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Modal visible={this.state.showModal} transparent={true}>
          <ImageViewer
            imageUrls={[{url: this.props.message}]}
            onCancel={() => this.setState({showModal: false})}
            renderIndicator={() => null}
            renderHeader={() => (
              <View>
                <StatusBar backgroundColor="transparent" />
                <Button
                  transparent
                  onPress={() => this.setState({showModal: false})}>
                  <Icon name="close" type="FontAwesome" />
                </Button>
              </View>
            )}
          />
        </Modal>
      </View>
    );
  }
}

export {ImageItem};

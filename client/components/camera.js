'use strict';
import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';
import * as action from '../actions/actions';
import styles from '../assets/styles';

//camera component provides camera functionality, and saves pictures to cameraRoll on capture
export default class CameraComponent extends Component {
  constructor(props) {
    super(props);

    this.camera = null;
    this.props.cameraModeOn();
    //state is internal to component since only used by camera
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
    };
    //binding functions used by camera
    this.takePicture = this.takePicture.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
  }
  //actual take picture function, promise will either increment counter or
  //log an error
  takePicture() {
    if (this.camera) {
      this.camera.capture()
        .then(() => this.props.takePictureSuccess())
        .catch((err) => console.log(err));
    }
  }
  navigate(destination) {
    this.props.navigator.push({ name: destination });
  }
  //switch between front and rear camera. relatively untested due to not developing on device,
  //but functionality appears to work in app in emulator
  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }
  //will retrieve proper icon depending on state of camera
  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../assets/ic_camera_front_white.png');
    }

    return icon;
  }
  //will switch between different flash modes
  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }
  //will return proper icon depending on state of flash mode
  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../assets/ic_flash_off_white.png');
    }

    return icon;
  }
  //will render camera, with capture, mode, and flash buttons
  render() {
    return (
      <View style={styles.cameraContainer}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buildCameraDeck}
            onPress={() => {{this.props.cameraModeOn()}{this.navigate('deckView')}}}>
            <Text style={styles.swipeBtnText}>BUILD DECK!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={this.takePicture}
          >
            <Image
              source={require('../assets/ic_photo_camera_36pt.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

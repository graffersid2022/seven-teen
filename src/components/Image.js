import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

function Image(props) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [props.blob]);

  return <Image source={imageSrc} style={{width: 150, height: 'auto'}} />;
}

export default Image;

const styles = StyleSheet.create({});

import React from "react";
import image from './IMG_0166.JPG'

const Image = () => (
  <img
    alt="should be cropped by container overflow:hidden style"
    style={styles.image}
    src={image}
  />
);

const styles = {
  image: {
    width:'100%',
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  }
};

export default Image;

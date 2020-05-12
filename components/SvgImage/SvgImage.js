import React from "react";
import { SvgXml } from "react-native-svg";

const SvgImage = ({ name, style }) => {
  return <SvgXml xml={name}  style={style}  />;
};

export default SvgImage;

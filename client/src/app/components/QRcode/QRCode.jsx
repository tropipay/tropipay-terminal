import React, { useEffect, useRef } from "react";
import QrLogo from "./image/logo_qr.png";
import QRCodeStyling from "qr-code-styling";
import "./QRCode.scss";

function createQr(props) {
  //ref: https://qr-code-styling.com/
  const size = props.size || 100;
  const colorBg = props && props.colorBg ? props.colorBg : '#F0F3FA';
  const colorBorder = props && props.colorBorder ? props.colorBorder : "#1b2a62";
  const type = props && props.type ? props.type : "square"; // rounded/square

  return new QRCodeStyling({
    width: size,
    height: size,
    data: props.url,
    margin: 0,
    qrOptions: {
      typeNumber: "0",
      mode: "Byte",
      errorCorrectionLevel: "Q"
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 5
    },
    dotsOptions: {
      type: type, 
      color: colorBorder, 
      gradient: null
    },
    backgroundOptions: {
      color: colorBg
    },
    image: QrLogo,
    dotsOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: colorBorder, 
        color2: colorBorder, // "#6a1a4c" no
        rotation: "0"
      }
    },
    cornersSquareOptions: {
      type: "dot", //... corners figure color
      color: colorBorder 
    },
    cornersSquareOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: colorBorder,
        color2: colorBorder,
        rotation: "0"
      }
    },
    cornersDotOptions: {
      type: "dot",
      color: colorBorder
    },
    cornersDotOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: colorBorder,
        color2: colorBorder,
        rotation: "0"
      }
    },
    backgroundOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: colorBg,
        color2: colorBg,
        rotation: "0"
      }
    }
  });
}

export default function QRCode(props) {
  //Calculating QR Dimension
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current.childElementCount < 1) {
      const qr = createQr(props);
      qr.append(ref.current);
    }
  }, [props]);

  return (
    <div
      ref={ref}
      id={"qrContainerTpp"}
      className={
        props.className
          ? props.className + " qrContainerTpp "
          : "qrContainerTpp"
      }
    />
  );
}

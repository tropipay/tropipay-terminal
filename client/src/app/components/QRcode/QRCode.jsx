import React, { useEffect, useRef } from "react";
import QrLogo from "./image/logo_qr.jpg";
import QRCodeStyling from "qr-code-styling";
import "./QRCode.scss";

function createQr(props) {
  //ref: https://qr-code-styling.com/
  const size = props.size || 100;
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
      type: "square",
      color: "#1b2a62",
      gradient: null
    },
    backgroundOptions: {
      color: "#ffffff"
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
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: "0"
      }
    },
    cornersSquareOptions: {
      type: "dot",
      color: "#1b2a62"
    },
    cornersSquareOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0"
      }
    },
    cornersDotOptions: {
      type: "dot",
      color: "#1b2a62"
    },
    cornersDotOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
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
        color1: "#ffffff",
        color2: "#ffffff",
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

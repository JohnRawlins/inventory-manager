import { BarCodeScanner } from "expo-barcode-scanner";
export const CAMERA_ACCESS_GRANTED = "CAMERA_ACCESS_GRANTED";
export const CAMERA_ACCESS_DENIED = "CAMERA_ACCESS_DENIED";
export const BARCODE_SCANNER_ACTIVE = "BARCODE_SCANNER_ACTIVE";
export const BARCODE_SCANNER_OFF = "BARCODE_SCANNER_OFF";
export const BARCODE_SCANNED = "BARCODE_SCANNED";

export const requestCameraPermission = () => {
  return async (dispatch) => {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") {
        dispatch({
          type: CAMERA_ACCESS_GRANTED,
        });
      } else {
        dispatch({
          type: CAMERA_ACCESS_DENIED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: CAMERA_ACCESS_DENIED,
      });
    }
  };
};

export const barcodeScannerActive = () => {
  return {
    type: BARCODE_SCANNER_ACTIVE,
  };
};

export const barcodeScannerOff = () => {
  return {
    type: BARCODE_SCANNER_OFF,
  };
};

export const barcodeScanned = () => {
  return {
    type: BARCODE_SCANNED,
  };
};

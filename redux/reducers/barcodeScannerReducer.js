import {
  CAMERA_ACCESS_GRANTED,
  CAMERA_ACCESS_DENIED,
  BARCODE_SCANNER_ACTIVE,
  BARCODE_SCANNER_OFF,
  BARCODE_SCANNED,
} from "../actions/barcodeScannerActions";

const initialState = {
  loadingBarcodeScanner: true,
  cameraAvailable: false,
  isScanning: false,
};

const barcodeScannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAMERA_ACCESS_GRANTED: {
      return {
        ...state,
        loadingBarcodeScanner: false,
        cameraAvailable: true,
        isScanning: true,
      };
    }
    case CAMERA_ACCESS_DENIED: {
      return {
        ...state,
        loadingBarcodeScanner: false,
        cameraAvailable: false,
        isScanning: false,
      };
    }
    case BARCODE_SCANNER_ACTIVE: {
      return {
        ...state,
        isScanning: true,
      };
    }

    case BARCODE_SCANNER_OFF: {
      return {
        ...state,
        isScanning: false,
      };
    }

    case BARCODE_SCANNED: {
      return {
        ...state,
        isScanning: false,
      };
    }
    default:
      return state;
  }
};

export default barcodeScannerReducer;

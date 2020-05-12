const initialState = {
  loadingBarcodeScanner: false,
  accessToCamera: false,
  scanning: false,
};

const barcodeScannerReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default barcodeScannerReducer;

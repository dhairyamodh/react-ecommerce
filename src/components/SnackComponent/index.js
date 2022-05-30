import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackBar } from "../../redux/actions/snackActions";
import { Alert } from '@mui/material';
import { Snackbar } from "@mui/material";


const SnackComponent = () => {
  const dispatch = useDispatch();

  const snack = useSelector((state) => state.snack);
  React.useEffect(() => {
    if (snack.open) {
      setTimeout(() => {
        dispatch(hideSnackBar());
      }, 4000);
    }
  }, [snack.open]);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={snack.open}
    >
      <Alert
        variant="filled"
        onClose={() => dispatch(hideSnackBar())}
        severity={snack.severity}
      >
        {snack.message}
      </Alert>
    </Snackbar>
  );
};
export default SnackComponent;

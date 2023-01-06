import { ChangeEvent, useEffect, useState } from "react";
import {
  makeStyles,
  Box,
  Paper,
  Typography,
  TextField,
  LinearProgress,
  Button,
} from "@material-ui/core";
import useStore from "../store";
import ProviderSelect from "./provider-select-dialog/ProviderSelect";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { satsToBtc } from "../convert-utils";
import ProviderSubmitDialog from "./provider-select-dialog/ProviderSubmitDialog";
import DownloadButton from "./DownloadButton";

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  inner: {
    width: "min(480px, 100%)",
    minHeight: "150px",
    display: "grid",
    padding: theme.spacing(1.5),
    gridGap: theme.spacing(1),
  },
  header: {
    padding: 0,
  },
  headerText: {
    padding: theme.spacing(1),
  },
  providerInfo: {
    padding: theme.spacing(1),
  },
  swapIconOuter: {
    display: "flex",
    justifyContent: "center",
  },
  swapIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Title = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Typography variant="h5" className={classes.headerText}>
        Swap BTC for XMR
      </Typography>
    </Box>
  );
};

export const SwapWidget = () => {
  const classes = useStyles();
  const currentProvider = useStore((state) => state.currentProvider);

  const [showSubmitProviderDialog, setShowSubmitProviderDialog] =
    useState(false);
  const [btcFieldValue, setBtcFieldValue] = useState<string | number>(0.02);
  const [xmrFieldValue, setXmrFieldValue] = useState(1);

  function onBtcAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setBtcFieldValue(event.target.value);
  }

  const updateXmrValue = () => {
    const parsedBtcAmount = Number(btcFieldValue);
    if (isNaN(parsedBtcAmount) || currentProvider === undefined) {
      setXmrFieldValue(0);
    } else {
      const convertedXmrAmount =
        parsedBtcAmount / satsToBtc(currentProvider.price);
      setXmrFieldValue(convertedXmrAmount);
    }
  };

  const getBtcFieldError = () => {
    const parsedBtcAmount = Number(btcFieldValue);
    if (currentProvider === undefined) {
      return "Undefined provider";
    } else if (isNaN(parsedBtcAmount)) {
      return "This is not a valid number";
    } else if (parsedBtcAmount < satsToBtc(currentProvider.minSwapAmount)) {
      return `The minimum swap amount is ${satsToBtc(
        currentProvider.minSwapAmount
      )} BTC`;
    } else if (parsedBtcAmount > satsToBtc(currentProvider.maxSwapAmount)) {
      return `The maximum swap amount is ${satsToBtc(
        currentProvider.maxSwapAmount
      )} BTC`;
    }
    return false;
  };

  useEffect(updateXmrValue, [btcFieldValue, currentProvider]);

  useEffect(() => {
    if (getBtcFieldError() && currentProvider !== undefined) {
      setBtcFieldValue(satsToBtc(currentProvider.minSwapAmount));
    }
  }, [currentProvider]);

  if (currentProvider === undefined) {
    return (
      <Box className={classes.outer}>
        {/* @ts-expect-error */}
        <Box className={classes.inner} component={Paper} elevation={15}>
          <Title />
          <LinearProgress />
          <DownloadButton />
        </Box>
        <ProviderSubmitDialog
          open={showSubmitProviderDialog}
          onClose={() => setShowSubmitProviderDialog(false)}
        />
      </Box>
    );
  } else {
    return (
      <Box className={classes.outer}>
        {/* @ts-expect-error */}
        <Box className={classes.inner} component={Paper} elevation={15}>
          <Title />
          <TextField
            label="Send"
            size="medium"
            variant="outlined"
            value={btcFieldValue}
            onChange={onBtcAmountChange}
            error={!!getBtcFieldError()}
            helperText={getBtcFieldError()}
            autoFocus
            InputProps={{
              endAdornment: <InputAdornment position="end">BTC</InputAdornment>,
            }}
          />
          <Box className={classes.swapIconOuter}>
            <ArrowDownwardIcon fontSize="small" />
          </Box>
          <TextField
            label="Receive"
            variant="outlined"
            size="medium"
            value={xmrFieldValue.toFixed(4)}
            InputProps={{
              endAdornment: <InputAdornment position="end">XMR</InputAdornment>,
            }}
          />
          <ProviderSelect />
          <DownloadButton />
        </Box>
      </Box>
    );
  }
};

export default SwapWidget;

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { baseDialog } from "../stores/app";

export default function BaseDialog(props) {
  const {children,actions} = props
  const [_baseDialog,setBaseDialog] = useAtom(baseDialog)
  const onClose = () => {
    setBaseDialog({open:false,type:''})
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (_baseDialog.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [_baseDialog.open]);

  return (
    <Dialog
        open={_baseDialog.open}
        onClose={onClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{_baseDialog.title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            component={'div'}
          >
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
          <Box style={{display:'flex',flexDirection: 'column',justifyContent: 'center',flexGrow:1}}>
            {actions}
          </Box>
        </DialogActions>
      </Dialog>
  )
}
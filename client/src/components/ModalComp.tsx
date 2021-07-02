import {
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";

function ModalComp({
  open,
  size = "md",
  title,
  children,
  disableBackdropClick,
  handleClose,
  handleConfirm,
  showActions,
  renderActions,
}: any) {
  return (
    <Dialog
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown
      maxWidth={size}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      onClose={handleClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {showActions && (
        <DialogActions>
          {renderActions ? (
            renderActions
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleClose}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={handleConfirm}
                color="primary"
                autoFocus
              >
                Ok
              </Button>
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default ModalComp;

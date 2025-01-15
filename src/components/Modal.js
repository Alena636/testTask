import {
  Box,
  Button,
  Dialog,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

const Modal = ({ open, onClose, config, onSubmit }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          padding: "20px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
          position: "relative",
        },
        backdropFilter: "blur(4px)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
          {config.title}
        </Typography>
        <Divider />
        {config.description && <Typography>{config.description}</Typography>}

        {config.inputs?.map((input) => (
          <TextField
            key={input.name}
            variant="outlined"
            label={input.label}
            value={input.value}
            onChange={input.onChange}
            placeholder={input.placeholder}
          />
        ))}
        {config.errorMessage && (
          <Box
            sx={{
              color: "red",
              marginTop: "-30px",
              fontSize: "0.9rem",
            }}
          >
            {config.errorMessage}
          </Box>
        )}

        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".5rem",
            margin: "0",
            justifyContent: "end",
            gap: ".5rem",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ height: "40px", minWidth: "90px" }}
          >
            Cancel
          </Button>
          <Button
            variant={config.title === "Delete" ? "outlined" : "contained"}
            sx={{ height: "40px", minWidth: "90px" }}
            onClick={onSubmit}
            color={config.title === "Delete" ? "error" : "primary"}
          >
            {config.submitText}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Modal;

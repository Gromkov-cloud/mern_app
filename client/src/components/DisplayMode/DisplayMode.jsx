import { useState } from "react"

import ToggleButton from "@mui/material/ToggleButton"
import QrCodeIcon from "@mui/icons-material/QrCode"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const DisplayMode = () => {
    const [selected, setSelected] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickToggle = () => {
        setSelected(!selected)
        setOpen(true)
    }

    return (
        <>
            <Dialog
                open={selected && open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Вы изменили режим отображения моделей
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Разрешите доступ браузера к камере вашего устройства.
                        Наведите камеру на QR код. Если выбранная модель
                        совпадает с QR кодом, то, после загрузки, вы увидите
                        модель. Для каждой модели предназначен свой QR код.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => {
                    handleClickToggle()
                }}
            >
                <QrCodeIcon />
            </ToggleButton>
        </>
    )
}

export default DisplayMode

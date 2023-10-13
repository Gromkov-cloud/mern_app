import { useState } from "react"

import ToggleButton from "@mui/material/ToggleButton"
import QrCodeIcon from "@mui/icons-material/QrCode"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { observer } from "mobx-react-lite"
import modelPageStore from "../../mobx-store/model-page-store"
import { Box } from "@mui/material"

const DisplayMode = observer(() => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const isCheckBoxSelected = modelPageStore.isDisplayModeAR
    const toggleCheckBoxSelect = modelPageStore.setIsDisplayModeAR

    const handleClickToggle = () => {
        if (isCheckBoxSelected) {
            toggleCheckBoxSelect(false)
        } else {
            setOpen(true)
        }
    }

    const applyButtonClickHandle = () => {
        setOpen(false)
        toggleCheckBoxSelect(true)
    }

    const cancelButtonClickHandle = () => {
        setOpen(false)
        toggleCheckBoxSelect(false)
    }

    return (
        <Box sx={{ backgroundColor: "white", borderRadius: "5px" }}>
            <Dialog
                open={!isCheckBoxSelected && open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Вы можете изменить режим отображения моделей
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
                    <Button onClick={applyButtonClickHandle} autoFocus>
                        Ок
                    </Button>
                    <Button onClick={cancelButtonClickHandle}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <ToggleButton
                value="check"
                selected={isCheckBoxSelected}
                onChange={() => {
                    handleClickToggle()
                }}
            >
                <QrCodeIcon />
            </ToggleButton>
        </Box>
    )
})

export default DisplayMode

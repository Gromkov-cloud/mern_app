import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import SidebarItemsList from "./SidebarItemsList"

const Sidebar = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                padding: "20px 0",
                marginTop: "-30px",
            }}
        >
            {/* SIDEBAR TITLE */}
            <Typography variant="h5" textAlign={"center"}>
                Меню
            </Typography>
            <Divider sx={{ marginTop: "10px" }} />

            {/* MENU NAV LINKS */}
            <SidebarItemsList />
        </Box>
    )
}

export default Sidebar

import { Box, Button } from "@mui/material"
import { NavLink } from "react-router-dom"

const DesktopMenuLayout = ({ menuLinks }) => {
    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                }}
            >
                {menuLinks.map((menuLink) => (
                    <Button
                        key={menuLink.name}
                        sx={{ my: 2, color: "white", display: "block" }}
                        component={NavLink}
                        to={menuLink.route}
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        {menuLink.name}
                    </Button>
                ))}
            </Box>
        </>
    )
}

export default DesktopMenuLayout

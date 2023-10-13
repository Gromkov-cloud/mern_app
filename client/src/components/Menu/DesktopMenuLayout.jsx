import { Box, Button } from "@mui/material"
import { NavLink } from "react-router-dom"
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded"

const DesktopMenuLayout = ({ routes }) => {
    return (
        <>
            <ViewInArRoundedIcon
                fontSize="medium"
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                }}
            >
                {routes.map((route) => (
                    <Button
                        key={route.path}
                        sx={{ my: 2, color: "white", display: "block" }}
                        component={NavLink}
                        to={route.path}
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        {route.name}
                    </Button>
                ))}
            </Box>
        </>
    )
}

export default DesktopMenuLayout

import React, {useState} from 'react';
import {
    AppBar,
    styled,
    Toolbar,
    Typography,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Button,
    IconButton,
} from '@mui/material';
import ToysIcon from '@mui/icons-material/Toys';
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledToolbar = styled(Toolbar) ({
    display: "flex",
    justifyContent: "space-between",
});


const Icons = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "20px",
    alignItems: "center"
}));



function Navbar() {

    const currentUser = sessionStorage.getItem("logged");

    console.log(currentUser)

    const handleLogOut = () => {
        sessionStorage.clear();
    }

    const [open, setOpen] = useState(false)
    return (
        <AppBar position={"sticky"} width={'95%'}>
            <StyledToolbar>
                <IconButton color={"inherit"} href="/">
                    <ToysIcon />
                </IconButton>
                <Typography variant={"h5"}>
                    Najdi si svoji jízdu
                </Typography>
                <Icons>
                    { sessionStorage.getItem("logged") !== null &&
                        <Button
                            variant="contained"
                            href="/favspage"
                        >
                            Oblíbené
                            <FavoriteIcon />
                        </Button>}

                    { !sessionStorage.getItem("logged") && <Button variant="contained" href="/login">Přihlásit se</Button>}
                    <Avatar
                        sx={{width:30, height:30}}
                        onClick={e=>setOpen(true)}
                    />


                </Icons>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) =>setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClick={handleLogOut}

            >
                <MenuItem>Logout</MenuItem>

            </Menu>
        </AppBar>
    )
}

export default Navbar;
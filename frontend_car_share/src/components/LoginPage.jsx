import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext";
import axios from "axios";
import {Stack} from "@mui/material";


const theme = createTheme();

export default function SignIn() {


    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [unsuccess, setUnsuccess] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = ({
            email: data.get('email'),
            password: data.get('password'),
        });


        const response = await axios.post(
            '/user/login',
            JSON.stringify(user),
            { headers: {
                    'Content-Type': 'application/json'
                }}
        )

        console.log(JSON.stringify(response))
        console.log(response.data)
        sessionStorage.setItem("userData", JSON.stringify(response.data))
        console.log(response.status)

        if (response.status === 200) {
            console.log(response.data)
            setUser({ email, password });
            setUnsuccess(false);
            setSuccess(true);
            sessionStorage.setItem("logged", JSON.stringify(user))
        }

        if (response.status === 204) {
            setUnsuccess(true)
            setSuccess(false)
            setEmail("")
            setPassword("");
            setErrMsg('Špatný email nebo heslo')

        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                { success &&
                    <div>
                        <Stack
                            justify="center"
                        >
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: "#4caf50",

                                }}
                            >
                                <Typography variant={"h5"}>Přihlášení proběhlo úspěšně</Typography>
                            </Box>
                            <Button
                                href="/"
                                color="success"
                                variant="outlined"
                            >
                                Domovská stránka
                            </Button>
                        </Stack>

                    </div>

                }
                { unsuccess &&
                    <div>
                        <Stack
                            justify="center"
                        >
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: "#f44336",

                                }}
                            >
                                <Typography variant={"h5"}>{ errMsg }</Typography>
                            </Box>
                            <Button
                                href="/"
                                color="error"
                                variant="outlined"
                            >
                                Domovská stránka
                            </Button>
                        </Stack>

                    </div>

                }

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'light-grey'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Přihlásit se
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Heslo"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Přihlásit
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Link href="/signup" variant="body2">
                                {"Nemáš účet? Registrace"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
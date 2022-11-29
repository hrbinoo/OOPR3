import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext, useState} from 'react';
import axios from "axios";
import {UserContext} from "../context/UserContext";
import {Stack} from "@mui/material";



const theme = createTheme();

export default function SignUp() {

    const { setUser } = useContext(UserContext);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [unsuccess, setUnSuccess] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(data.get('firstName') === "" || data.get('lastName') === ""
            || data.get('email') === "" || data.get('password') === "" ){
            setUnSuccess(true);
            setErrMsg('Zadejte prosím všechny údaje')
        } else {

            const newUser = ({
                name: data.get('firstName'),
                lastName: data.get('lastName'),
                email: data.get('email'),
                password: data.get('password'),
            });

            console.log(newUser)

            const response = await axios.post(
                '/user/saveuser',
                JSON.stringify(newUser),
                { headers: {
                        'Content-Type': 'application/json'
                    }}
            )

            console.log(response.data)
            sessionStorage.setItem("userData", JSON.stringify(response.data))
            setUser({ email, password });
            setUnSuccess(false);
            setSuccess(true);
            sessionStorage.setItem("logged", JSON.stringify(newUser))
            setName("")
            setLastName("")
            setEmail("")
            setPassword("")
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
                                <Typography variant={"h5"}>Registrace proběhla úspěšně</Typography>
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
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrace
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    value={name}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Jméno"
                                    autoFocus
                                    onChange={event => setName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    value={lastName}
                                    id="lastName"
                                    label="Příjmení"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={event => setLastName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={email}
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={password}
                                    name="password"
                                    label="Heslo"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrace
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Link href="/login" variant="body2">
                                Již máš účet? Přihlášení
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
import  {useState} from 'react';
import {
    Box, Button,
    CardActions,
    CardContent, CardHeader,
    Collapse,
    IconButton,
    List, ListItem,
    Stack,
    styled,
    Typography
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from '@mui/material/Modal';
import axios from "axios";


const ExpandMore1 = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CarCard = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { id, brand, model, bodywork, seats, doors, imagePath, year, description,  carInfos } = props.props
    const { performance, engine, powerTransimission } = carInfos[0]
    const { maxSpeed, zeroToHundred , fuel, fuelConsumption } = performance
    const { countCylinders, displacement , power, torque } = engine
    const { gears, driveType } = powerTransimission


    function handleFavorite(car){

        if(!sessionStorage.getItem("logged")) {
            // dialogove okno
            setShowModal(true);

        } else {
            // save
            console.log("save")
            setDisabled(true);

            saveCarToFav(car)
            console.log(sessionStorage.getItem("userData"))
        }
    }

    const saveCarToFav = async (car) => {

        const parse = JSON.parse(sessionStorage.getItem("logged"))
        const email = parse.email
        const password = parse.password

        const newUserCar = ({
            email: email,
            password: password,
            carId: car.id
        })

        const response = await axios.post(
            '/user/savecar',
            JSON.stringify(newUserCar),
            { headers: {
                    'Content-Type': 'application/json'
                }}
        )
    }

    const title = brand + " " + model + ", " + year

    return(
        <div className={"card"}>
            <CardHeader
                title={title}


            />
            <Stack direction={"row"}>
                <Box
                    flex={1}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}

                >
                    <img src={"/images/" + imagePath} width="200" height="130" alt={"img"}/>
                </Box>
                <Box
                    flex={2}
                >
                    <CardContent>
                        <Typography gutterBottom variant='h6' component='div'>
                            O autu
                        </Typography>

                        <Typography variant='body2'>
                            {description}
                        </Typography>
                    </CardContent>

                </Box>
            </Stack>

            <CardActions>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    width={'100%'}
                >
                    <Button
                        variant="outlined"
                        onClick={() => handleFavorite(props.props)}
                        disabled = {disabled}

                    >
                        P??idat do obl??ben??ch
                        <FavoriteIcon />
                    </Button>
                    <Box
                        sx={{ justifyContent: 'flex-end'}}
                    >
                        <ExpandMore1
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>

                        </ExpandMore1>
                    </Box>
                </Stack>

                <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Obl??ben??
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Pro ukl??d??n?? inzer??t?? do obl??ben??ch je nutn?? se p??ihl??sit.
                        </Typography>
                    </Box>
                </Modal>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Stack direction="row">
                        <Box marginLeft={10}>
                            <Box>
                                <Typography variant={"h6"}>
                                    Z??kladn?? informace:
                                </Typography>
                                <List>
                                    <ListItem>
                                        <Typography>Karos??rie: {bodywork}  </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Po??et sedadel: {seats}  </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Po??et dve????: {doors}  </Typography>
                                    </ListItem>
                                </List>

                            </Box>

                            <Box>
                                <Typography variant={"h6"}>
                                    V??kon:
                                </Typography>
                                <List>
                                    <ListItem>
                                        <Typography>Maxim??ln?? rychlost: {maxSpeed} km/h </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Zrychlen?? z 0km na 100km: {zeroToHundred} s </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Spot??eba: {fuelConsumption} </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Palivo: {fuel} </Typography>
                                    </ListItem>
                                </List>

                            </Box>

                        </Box>

                        <Box marginLeft={15}>
                            <Box marginBottom={5}>
                                <Typography variant={"h6"}>
                                    P??enos v??konu:
                                </Typography>
                                <List>
                                    <ListItem>
                                        <Typography>Po??et rychlost??: {gears} </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Pohon: {driveType} </Typography>
                                    </ListItem>
                                </List>

                            </Box>

                            <Box>
                                <Typography variant={"h6"}>
                                    Motor:
                                </Typography>
                                <List>
                                    <ListItem>
                                        <Typography>Po??et v??lc??: {countCylinders} </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Obsah: {displacement} l </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>V??kon: {power} kW </Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>Krout??c?? moment: {torque} Nm </Typography>
                                    </ListItem>
                                </List>

                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </Collapse>

        </div>

    )
}




export default CarCard;

/*
            title= {item.brand} {item.model}
            <img src={item.image} className={"cardImage"} alt={""}/>

              const { performance, engine, powerTransimisson } = carInfos
    const { maxSpeed, zeroToHundred, fuel} = performance
 */
import React, {useEffect, useState} from 'react';
import {
    alpha,
    Box, Button,
    FormControl, InputBase,
    InputLabel,
    List,
    ListItem, MenuItem, Select, Slider,
    Stack, styled,
    Typography
} from "@mui/material";

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from "@mui/icons-material/Search";
import riderided from "./RideCard";
import RideCard from "./RideCard";



//search box settings
const SearchS = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



function Feed(props) {

    const rides = props.props


    // searchbox filter
    const [filteredList, setFilteredList] = useState(rides);
    const [searchWord, setSearchWord] = useState("");

    //button handler
    const handleFilter = (event) => {
        setSearchWord(event.target.value);
    }
    //filtering method
    const filteredBySearchWord = (filteredData) => {

        if(!searchWord) return filteredData;


        const filteredRides = filteredData.filter(
            (ride) => ride.brand.toUpperCase().includes(searchWord.toUpperCase()) ||
                ride.model.toUpperCase().includes(searchWord.toUpperCase())

        );
        return filteredRides;
    }


    // brand filter
    const [selectedCity, setSelectedCity] = React.useState('');

    //button handler
    const handleChangeCity = (event) => {
        const inputCity = event.target.value;

        if (inputCity === selectedCity) {
            setSelectedCity("");
        }
        else {
            setSelectedCity(inputCity);
        }
    }

    //filtering method
    const filterByBrand = (filteredData) => {

        if(!selectedCity) return filteredData;

        const filteredRides = filteredData.filter(
            (ride) => ride.city === selectedCity
        );

        return filteredRides;
    }


    //date from
    const [dateFrom, setdateFrom] = useState('');
    //date from button
    const handleChangedateFrom = (event) => {
        setdateFrom(event.target.value);
    }
    //date until
    const [yearUntil, setYearUntil] = useState('');
    //date until button
    const handleChangeYearUntil = (event) => {
        setYearUntil(event.target.value);
    }

    //filter method
    const filterByDate = (filteredData) => {

        if(!dateFrom && !yearUntil) {
            return filteredData;
        }
        else if (!dateFrom){
            const filteredRides = filteredData.filter(
                (ride) => ride.year <= yearUntil
            );
            return filteredRides;
        }
        else if (!yearUntil){
            const filteredRides = filteredData.filter(
                (ride) => dateFrom <= ride.year
            );
            return filteredRides;
        }
        else {
            const filteredRides = filteredData.filter(
                (ride) => dateFrom <= ride.year && ride.year <= yearUntil
            );
            return filteredRides;
        }

    }


    //  consumption filter
    const [consumptionValue, setConsumptionValue] = useState([0, 15]);
    const minDistance = 1;

    // must have function
    function fuelConsumptionValue(value) {
        return `${value}l/100km`;
    }


    //handle consumption button
    const handleChangeSliderConsumption = (event, newValue, activeThumb1) => {
        if(!Array.isArray(newValue)){
            return;
        }

        if(activeThumb1 === 0){
            setConsumptionValue([Math.min(newValue[0], consumptionValue[1] - minDistance), consumptionValue[1]])
        } else {
            setConsumptionValue([consumptionValue[0], Math.max(newValue[1], consumptionValue[0] + minDistance)]);
        }
    };

    //filter method
    const filterByConsumption = (filteredData) => {


        if( consumptionValue[0] === 0 && consumptionValue[1] === 15) {
            return filteredData;
        }
        else if (consumptionValue[0] === 0){
            const filteredRides = filteredData.filter(
                (ride) => ride.rideInfos[0].performance.fuelConsumption < consumptionValue[1]
            );
            return filteredRides;
        }
        else if (consumptionValue[1] === 15){
            const filteredRides = filteredData.filter(
                (ride) => consumptionValue[0] < ride.rideInfos[0].performance.fuelConsumption
            );
            return filteredRides;
        }
        else {
            const filteredRides = filteredData.filter(
                (ride) => consumptionValue[0] < ride.rideInfos[0].performance.fuelConsumption &&
                    ride.rideInfos[0].performance.fuelConsumption < consumptionValue[1]
            );
            return filteredRides;
        }
    }

    // fuel filter
    const [selectedFuel, setSelectedFuel] = React.useState('');

    //button handler
    const handleChangeFuel = (event) => {
        const inputFuel = event.target.value;

        if (inputFuel === selectedFuel) {
            setSelectedFuel("");
        }
        else {
            setSelectedFuel(inputFuel);
        }
    }

    //filtering method
    const filterByFuel = (filteredData) => {

        if(!selectedFuel) return filteredData;

        const filteredRides = filteredData.filter(
            (ride) => ride.rideInfos[0].performance.fuel === selectedFuel
        );

        return filteredRides;
    }



    // KW filter
    const [kWValue, setkWValue] = useState([20, 500]);

    // kw function
    function kwValue(value) {
        return `${value}kW`;
    }
    //kw handler button
    const handleChangeSliderKW = (event, newValue, activeThumb2) => {
        if(!Array.isArray(newValue)){
            return;
        }

        if(activeThumb2 === 0){
            setkWValue([Math.min(newValue[0], kWValue[1] - minDistance), kWValue[1]])
        } else {
            setkWValue([kWValue[0], Math.max(newValue[1], kWValue[0] + minDistance)]);
        }
    }

    //filter method
    const filterByKW = (filteredData) => {


        if( kWValue[0] === 20 && kWValue[1] === 500) {
            return filteredData;
        }
        else if (kWValue[0] === 20){
            const filteredRides = filteredData.filter(
                (ride) => ride.rideInfos[0].engine.power <= kWValue[1]
            );
            return filteredRides;
        }
        else if (kWValue[1] === 500){
            const filteredRides = filteredData.filter(
                (ride) => kWValue[0] <= ride.rideInfos[0].engine.power
            );
            return filteredRides;
        }
        else {
            const filteredRides = filteredData.filter(
                (ride) => kWValue[0] <= ride.rideInfos[0].engine.power &&
                    ride.rideInfos[0].engine.power <= kWValue[1]
            );
            return filteredRides;
        }

    }


    const handleResetFilter = () => {
        setSelectedCity("");
        setdateFrom("")
        setYearUntil("")
        setConsumptionValue([0,15])
        setSelectedFuel("")
        setkWValue([20,500])
    }


    useEffect(() => {
            let filteredData = filteredBySearchWord(rides);
            filteredData = filterByBrand(filteredData);
            filteredData = filterByDate(filteredData);
            filteredData = filterByConsumption(filteredData);
            filteredData = filterByFuel(filteredData);
            filteredData = filterByKW(filteredData);
            //filteredData = filterByBrand(selectedBrand, filteredData)  filteredBySearchWord(rides)
            setFilteredList(filteredData);

        },
        [searchWord, selectedCity, dateFrom, yearUntil, consumptionValue, selectedFuel, kWValue])



    return (
        <Stack direction={"row"} spacing={2}>

            <Box
                flex={1}
                p={2}
                sx={{ display: { xs: "none", sm: "block"} }}
                backgroundColor={"lightgray"}
                maxWidth={230}
                maxHeight={800}

            >
                <Box>
                    <Stack direction={"row"}>
                        <FilterAltIcon color={"error"} size={"large"}/>
                        <Typography color={"error"} variant={"h5"}>Filtruj podle</Typography>
                    </Stack>
                </Box>
                <List>
                    <ListItem>
                        <Typography>
                            Značka auta
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                            <InputLabel id="demo-select-small">Vyber z možností</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={selectedCity}
                                label="Vyber z možností"
                                onChange={handleChangeCity}
                            >
                                <MenuItem value="Škoda">Škoda</MenuItem>
                                <MenuItem value="Mercedes">Mercedes</MenuItem>
                                <MenuItem value="Audi">Audi</MenuItem>
                                <MenuItem value="VW">VW</MenuItem>
                                <MenuItem value="BMW">BMW</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>

                    </ListItem>
                    <ListItem>
                        <Typography>
                            Rok výroby
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Stack direction={"row"}>
                            <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                                <InputLabel id="dateFrom">Od</InputLabel>
                                <Select
                                    labelId="dateFrom"
                                    id="dateFrom"
                                    value={dateFrom}
                                    label="Od"
                                    onChange={handleChangedateFrom}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={2000}>2000</MenuItem>
                                    <MenuItem value={2005}>2005</MenuItem>
                                    <MenuItem value={2010}>2010</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                                <InputLabel id="yearTo">Do</InputLabel>
                                <Select
                                    labelId="yearTo"
                                    id="yearTo"
                                    value={yearUntil}
                                    label="Do"
                                    onChange={handleChangeYearUntil}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={2000}>2000</MenuItem>
                                    <MenuItem value={2005}>2005</MenuItem>
                                    <MenuItem value={2010}>2010</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </ListItem>

                    <ListItem>

                    </ListItem>

                    <ListItem>
                        <Typography>
                            Spotřeba l/100km
                        </Typography>
                    </ListItem>

                    <ListItem></ListItem>
                    <ListItem></ListItem>

                    <ListItem>
                        <Box sx={{ width: 175 }}>
                            <Slider
                                getAriaLabel={() => 'Fuel Consumption range'}
                                value={consumptionValue}
                                onChange={handleChangeSliderConsumption}
                                valueLabelDisplay="on"
                                getAriaValueText={fuelConsumptionValue}

                                min={0}
                                max={15}
                                step={0.1}
                            />
                        </Box>
                    </ListItem>

                    <ListItem></ListItem>

                    <ListItem>
                        <Typography>
                            Palivo
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                            <InputLabel id="demo-select-small">Vyber z možností</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={selectedFuel}
                                label="Vyber z možností"
                                onChange={handleChangeFuel}
                            >
                                <MenuItem value="Diesel">Diesel</MenuItem>
                                <MenuItem value="Benzín">Benzín</MenuItem>
                                <MenuItem value="LPG">LPG</MenuItem>
                                <MenuItem value="Elektro">Elektro</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>

                    <ListItem></ListItem>

                    <ListItem>
                        <Typography>
                            Výkon v kW
                        </Typography>
                    </ListItem>

                    <ListItem></ListItem>
                    <ListItem></ListItem>

                    <ListItem
                        sx={{
                            maxWidth: 200
                        }}>
                        <Slider
                            getAriaLabel={() => 'Minimum distance shift'}
                            value={kWValue}
                            onChange={handleChangeSliderKW}
                            valueLabelDisplay="on"
                            getAriaValueText={kwValue}
                            min={20}
                            max={500}
                            step={10}

                        />

                    </ListItem>

                    <ListItem></ListItem>

                    <ListItem>
                        <Box
                            sx={{
                                marginLeft: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Button variant={"contained"} onClick={handleResetFilter}>Resetovat filtry</Button>

                        </Box>
                    </ListItem>
                </List>
            </Box>


            <Box
                flex={4}
                p={2}
                maxWidth={1000}
            >
                <Box
                    width={'95%'}
                    backgroundColor={"lightgray"}
                    padding={3}
                >
                    <SearchS>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{color: "black"}}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleFilter}
                        />
                    </SearchS>
                </Box>



                <div>
                    {filteredList.map( (ride) => (
                        <RideCard key={ride.id} props={ride}/>
                    ) )}
                </div>
            </Box>








        </Stack>

    );
}



export default Feed;
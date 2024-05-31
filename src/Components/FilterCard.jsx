import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Checkbox,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Card,
  CardMedia,
  CardContent,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {useLocation, useNavigate} from 'react-router-dom'

const FilterCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedColor,setSelectedColor] = useState('')
  const [selectedGender,setSelectedGender] = useState('')
  const [selectedPrice,setSelectedPrice] = useState('')
  const [selectedType,setSelectedType] = useState('')
  const [open, setOpen] = useState(false);


  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedColor(params.get("color") || "");
    setSelectedGender(params.get("gender") || "");
    setSelectedPrice(params.get("price") || "");
    setSelectedType(params.get("type") || "");
  }, []);

  const handleColorChange = (e) => {
    const { name } = e.target;
    setSelectedColor(selectedColor === name ? "" : name);
    const newParams = new URLSearchParams(location.search);
    newParams.set('color', selectedColor === name ? "" : name);
    navigate(`?${newParams.toString()}`);
  }
  const handleGenderChange = (e) => {
    const { name } = e.target;
    setSelectedGender(selectedGender === name ? "" : name);
    const newParams = new URLSearchParams(location.search);
    newParams.set('gender', selectedGender === name ? "" : name);
    navigate(`?${newParams.toString()}`);
  }
  const handlePriceChange = (e) => {
    const { name } = e.target;
    setSelectedPrice(selectedPrice === name ? "" : name);
    const newParams = new URLSearchParams(location.search);
    newParams.set('price', selectedPrice === name ? "" : name);
    navigate(`?${newParams.toString()}`);
  }
  const handleTypeChange = (e) => {
    const { name } = e.target;
    setSelectedType(selectedType === name ? "" : name);
    const newParams = new URLSearchParams(location.search);
    newParams.set('type', selectedType === name ? "" : name);
    navigate(`?${newParams.toString()}`);
  }




  return (
    <>
      {/* // ! Filter Section for the small screens */}
      <Box
        component={"section"}
        className="xl:hidden my-10 flex w-full lg:px-12 px-2 items-center justify-end"
      >
        <Box component={"div"}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleToggleDrawer}
            endIcon={<FilterAltIcon />}
          >
            Filter
          </Button>
          <Drawer anchor="bottom" open={open} onClose={handleToggleDrawer}>
            
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Colour</Typography>
              </AccordionSummary>
              <FormGroup className="px-4">
                {["red", "blue", "green"].map((color) => (
                    <FormControlLabel
                      key={color}
                      label={color.charAt(0).toUpperCase() + color.slice(1)}
                      control={
                        <Checkbox
                          name={color}
                          onChange={handleColorChange}
                          checked={selectedColor === color}
                        />
                      }
                    />
                ))}
              </FormGroup>
              <AccordionDetails></AccordionDetails>
            </Accordion>

            
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Gender</Typography>
              </AccordionSummary>
              <FormGroup className="px-4">
              {["men", "women"].map((gender) => (
                    <FormControlLabel
                      key={gender}
                      label={gender.charAt(0).toUpperCase() + gender.slice(1)}
                      control={
                        <Checkbox
                          name={gender}
                          onChange={handleGenderChange}
                          checked={selectedGender === gender}
                        />
                      }
                    />
                ))}
              </FormGroup>
              <AccordionDetails></AccordionDetails>
            </Accordion>

            
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Price</Typography>
              </AccordionSummary>
              <FormGroup className="px-4">
              {["0-250", "251-450", "450"].map((price) => (
                    <FormControlLabel
                      key={price}
                      label={price.replace("-", " to Rs ")}
                      control={
                        <Checkbox
                          name={price}
                          onChange={handlePriceChange}
                          checked={selectedPrice === price}
                        />
                      }
                    />
                ))}
              </FormGroup>
              <AccordionDetails></AccordionDetails>
            </Accordion>

            
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Type</Typography>
              </AccordionSummary>
              <FormGroup className="px-4">
              {["polo", "hoodie", "basic"].map((type) => (
                  <FormControlLabel
                    key={type}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    control={
                      <Checkbox
                        name={type}
                        onChange={handleTypeChange}
                        checked={selectedType === type}
                      />
                    }
                  />
                ))}
              </FormGroup>
              <AccordionDetails></AccordionDetails>
            </Accordion>
          </Drawer>
        </Box>
      </Box>

      {/* // ! Filter Section for the large screens */}
      <Box
        className="xl:block hidden"
        component={"section"}
        sx={{ width: "30%", borderRadius: 6 }}
      >
        <Box sx={{ borderRadius: 6.5 }}>
          <Card sx={{ border: 1, borderColor: "transparent", borderRadius: 0 }}>
            <CardContent>
              {/* // ! Filter Color Section */}
              <Box component={"div"}>
                <Typography gutterBottom variant="h6" fontWeight={900}>
                  Colour
                </Typography>
                <FormGroup>
                  {["red", "blue", "green"].map((color) => (
                    <FormControlLabel
                      key={color}
                      label={color.charAt(0).toUpperCase() + color.slice(1)}
                      control={
                        <Checkbox
                          name={color}
                          onChange={handleColorChange}
                          checked={selectedColor === color}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </Box>

              {/* // ! Filter Gender Section */}
              <Box component={"div"}>
                <Typography gutterBottom variant="h6" fontWeight={900}>
                  Gender
                </Typography>
                <FormGroup>
                  {["men", "women"].map((gender) => (
                    <FormControlLabel
                      key={gender}
                      label={gender.charAt(0).toUpperCase() + gender.slice(1)}
                      control={
                        <Checkbox
                          name={gender}
                          onChange={handleGenderChange}
                          checked={selectedGender === gender}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </Box>

              {/* // ! Filter Price Section */}
              <Box component={"div"}>
                <Typography gutterBottom variant="h6" fontWeight={900}>
                  Price
                </Typography>
                <FormGroup>
                  {["0-250", "251-450", "450"].map((price) => (
                    <FormControlLabel
                      key={price}
                      label={price.replace("-", " to Rs ")}
                      control={
                        <Checkbox
                          name={price}
                          onChange={handlePriceChange}
                          checked={selectedPrice === price}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </Box>

              {/* // ! Filter Type Section */}
              <Box component={"div"}>
                <Typography gutterBottom variant="h6" fontWeight={900}>
                  Type
                </Typography>
                <FormGroup>
                {["polo", "hoodie", "basic"].map((type) => (
                  <FormControlLabel
                    key={type}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    control={
                      <Checkbox
                        name={type}
                        onChange={handleTypeChange}
                        checked={selectedType === type}
                      />
                    }
                  />
                ))}
                </FormGroup>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default FilterCard;

import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../App.css";
import { Alert, FormControl, FormLabel, Stack } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";

/**
 * Datasets2 create forms, handles error, sends the data to api, receives the file and displays it so that user can download thes file.
 *
 * @returns {JSX.Element} - Datasets2 component
 */
const Datasets2 = () => {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState("File Name");
  const [selectedYears, setSelectedYears] = useState(["2022"]);
  const [selectedMonths, setSelectedMonths] = useState(["01"]);
  const [selectedDays, setSelectedDays] = useState(["01"]);
  const [selectedArea, setSelectedArea] = useState("");

  const [formErrors, setFormErrors] = useState({
    mean: false,
    variable: false,
    year: false,
    month: false,
    day: false,
    area: false,
    format: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const variable = data.get("variable");
    const mean = data.get("mean");
    const year = data.get("year");
    const month = data.get("month");
    const day = data.get("day");
    const area = data.get("area");
    const format = data.get("format");

    const errors = {
      variable: !variable,
      year: !year,
      month: !month,
      day: !day,
      mean: !mean,
      area: !area,
      format: !format,
    };
    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      console.log("One (or more) of the required fields is missing");
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    let payload = {
      mean: mean,
      variable: variable,
      years: selectedYears,
      month: selectedMonths,
      day: selectedDays,
      format: format,
    };
    if (area === "subRegion") {
      payload.area = selectedArea;
    }
    console.log(payload);
  };

  return (
    <>
      <div className="items-center block m-3 text-left">
        <Typography variant="body1">Data Set 2</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          noValidate
          alignContent="center"
          justifyContent="center"
        >
          <FormControl error={formErrors.error}>
            <FormControl error={formErrors.mean}>
              <TimeAggregation />
            </FormControl>
            <FormControl error={formErrors.year}>
              <YearComponent
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
              />
            </FormControl>
            <FormControl error={formErrors.month}>
              <MonthComponent
                selectedMonths={selectedMonths}
                setSelectedMonths={setSelectedMonths}
              />
            </FormControl>
            <FormControl error={formErrors.day}>
              <DayComponent
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            </FormControl>
            <FormControl error={formErrors.variable}>
              <Variable />
            </FormControl>
            <FormControl error={formErrors.area}>
              <GeographicalAreaComponent
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
              />
            </FormControl>
            <FormControl error={formErrors.format}>
              <FormatComponent />
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
            {Object.values(formErrors).some((error) => error) && (
              <>
                <Alert
                  variant="standard"
                  severity="error"
                  className="p-2 mb-3 rounded-md shadow-lg bg-gray-50"
                >
                  Error : One (or more) of the required fields is missing !
                </Alert>
              </>
            )}
            {submitted && (
              <Alert
                variant="standard"
                severity="success"
                className="p-2 mb-3 rounded-md shadow-lg "
              >
                Success : Your request is successfully submitted!
              </Alert>
            )}
          </FormControl>
          <File filename={file} setFile={setFile} />
        </Box>
      </div>
    </>
  );
};
export default Datasets2;

/**
 * File component renders a section for downloading and managing a file.
 *
 * @param {Object} param0 - Component props
 * @param {string} param0.filename - Name of the file to be downloaded
 * @param {function} param0.setFile - Callback function to update the file state
 * @returns {JSX.Element} - File component
 */
const File = ({ filename, setFile }) => {
  const downloadFile = filename.toString();

  return (
    <Box className="items-center block p-2 m-0 text-left rounded-md shadow-lg bg-gray-50 ">
      <Typography variant="body1">
        Download File
        <IconButton
          sx={{ width: "auto" }}
          variant="contained"
          component="label"
          onClick={() => setFile("File Name")}
        >
          <BugReportIcon />
        </IconButton>
      </Typography>

      {filename !== "nofile" && (
        <Stack
          paddingTop={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          <Button
            variant="text"
            sx={{ width: { xs: "auto", sm: 400 }, flexGrow: 1 }}
          >
            {downloadFile}
          </Button>
          {downloadFile !== "error" && (
            <>
              {" "}
              <Button variant="contained" component="label" sx={{ width: 150 }}>
                Download
                <DownloadIcon />
              </Button>
            </>
          )}
          <Button
            sx={{ bgcolor: "#FF9494", width: 110 }}
            variant="contained"
            component="label"
            onClick={() => setFile("nofile")}
          >
            Delete
            <DeleteIcon />
          </Button>
        </Stack>
      )}
    </Box>
  );
};

//-------------------------------------------------------------

/**
 * TimeAggregation component renders a section for selecting and managing time aggregation mean
 *
 * @returns {JSX.Element} - TimeAggregation
 */
const TimeAggregation = () => {
  const [selectedFormat, setSelectedFormat] = useState("monthly_mean");

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleClearAll = () =>{
    setSelectedFormat("");
  }
  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Time aggregation</Typography>
      <FormLabel>At least one selection must be made</FormLabel>

      <RadioGroup
        name="mean"
        value={selectedFormat}
        onChange={handleFormatChange}
        row
      >
        <FormControlLabel
          value="monthly_mean"
          control={<Radio />}
          label="Monthly mean"
        />
        <FormControlLabel
          value="daily_mean"
          control={<Radio />}
          label="Daily mean"
        />
      </RadioGroup>
      <Button onClick={handleClearAll}>Clear All</Button>
    </Box>
  );
};

/**
 * Variable component renders a section for selecting and managing Variable type for the download file.
 *
 * @returns {JSX.Element} - Variable Component
 */
const Variable = () => {
  const [selectedVariable, setSelectedVariable] = useState("all");

  const handleVariableChange = (event) => {
    setSelectedVariable(event.target.value);
  };
  const handleClearAll = () => {
    setSelectedVariable("");
  };
  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Variable</Typography>
      <FormLabel>At least one selection must be made</FormLabel>

      <RadioGroup
        name="variable"
        value={selectedVariable}
        onChange={handleVariableChange}
        row
      >
        <FormControlLabel
          value="all"
          control={<Radio />}
          label="All available variables"
        />
      </RadioGroup>

      <Button onClick={handleClearAll}>Clear All</Button>
    </Box>
  );
};

/**
 * YearComponent component renders a section for selecting and managing years.
 *
 * @param {Object} props - Component props
 * @param {Array} props.selectedYears - Array of selected years
 * @param {function} props.setSelectedYears - Callback function to update the selected years state
 * @returns {JSX.Element} - YearComponent component
 */
const YearComponent = ({ selectedYears, setSelectedYears }) => {
  const startYear = 1979;
  const endYear = 2022;
  const years = [...Array(endYear - startYear + 1)].map(
    (_, index) => startYear + index
  );

  function handleSelectAll() {
    setSelectedYears(years.map((year) => year.toString()));
  }

  function handleClearAll() {
    setSelectedYears([]);
  }

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Year</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {years.map((year, index) => (
          <FormControlLabel
            key={index}
            name="year"
            value={year.toString()}
            control={
              <Checkbox
                checked={selectedYears.includes(year.toString())}
                onChange={() => {
                  setSelectedYears((prevSelectedYears) => {
                    if (prevSelectedYears.includes(year.toString())) {
                      return prevSelectedYears.filter(
                        (selectedYear) => selectedYear !== year.toString()
                      );
                    } else {
                      return [...prevSelectedYears, year.toString()];
                    }
                  });
                }}
              />
            }
            className="w-full p-2 lg:w-1/8 md:w-1/6 sm:w-1/3"
            label={year.toString()}
          />
        ))}
      </div>
      <Button className="left-0" onClick={handleClearAll}>
        Clear All
      </Button>
      <Button className="left-2" onClick={handleSelectAll}>
        Select All
      </Button>
    </Box>
  );
};

/**
 * MonthComponent component renders a section for selecting and managing months.
 *
 * @param {Object} props - Component props
 * @param {Array} props.selectedMonths - Array of selected months
 * @param {function} props.setSelectedMonths - Callback function to update the selected months state
 * @returns {JSX.Element} - MonthComponent component
 */
const MonthComponent = ({ selectedMonths, setSelectedMonths }) => {
  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  const handleSelectAll = () => {
    const allMonths = months.map((month) => month.value);
    setSelectedMonths(allMonths);
  };

  const handleClearAll = () => {
    setSelectedMonths([]);
  };

  const handleMonthSelection = (value) => {
    setSelectedMonths((prevSelectedMonths) => {
      if (prevSelectedMonths.includes(value)) {
        return prevSelectedMonths.filter(
          (selectedMonth) => selectedMonth !== value
        );
      } else {
        return [...prevSelectedMonths, value];
      }
    });
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Month</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {months.map((month) => (
          <FormControlLabel
            key={month.value}
            value={month.name}
            name="month"
            className="w-full p-2 lg:w-1/8 md:w-1/6 sm:w-1/3"
            control={
              <Checkbox
                checked={selectedMonths.includes(month.value)}
                onChange={() => handleMonthSelection(month.value)}
              />
            }
            label={month.name}
          />
        ))}
      </div>
      <Button className="left-0" onClick={handleClearAll}>
        Clear All
      </Button>
      <Button className="left-2" onClick={handleSelectAll}>
        Select All
      </Button>
    </Box>
  );
};

/**
 * DayComponent component renders a section for selecting and managing days.
 *
 * @param {Object} props - Component props
 * @param {Array} props.selectedDays - Array of selected days
 * @param {function} props.setSelectedDays - Callback function to update the selected days state
 * @returns {JSX.Element} - DayComponent component
 */
const DayComponent = ({ selectedDays, setSelectedDays }) => {
  const days = [...Array(31).keys()].map((day) => {
    const dayNumber = day + 1;
    return dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
  });

  const handleSelectAll = () => {
    setSelectedDays(days);
  };

  const handleClearAll = () => {
    setSelectedDays([]);
  };

  const handleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Day</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {days.map((day, index) => (
          <FormControlLabel
            key={index}
            name="day"
            value={day}
            className="w-full p-2 lg:w-1/8 md:w-1/6 sm:w-1/3"
            control={
              <Checkbox
                checked={selectedDays.includes(day)}
                onChange={() => handleDaySelection(day)}
              />
            }
            label={day}
          />
        ))}
      </div>
      <Button className="left-0" onClick={handleClearAll}>
        Clear All
      </Button>
      <Button className="left-2" onClick={handleSelectAll}>
        Select All
      </Button>
    </Box>
  );
};

/**
 * GeographicalAreaComponent component renders a section for selecting and managing geographical area.
 *
 * @param {Object} props - Component props
 * @param {Array} props.selectedArea - Array of selected areas
 * @param {function} props.setSelectedArea - Callback function to update the selected area state
 * @returns {JSX.Element} - GeographicalAreaComponent
 */
const GeographicalAreaComponent = ({ selectedArea, setSelectedArea }) => {
  const [areaOption, setAreaOption] = useState("wholeRegion");
  const [north, setNorth] = useState(90);
  const [west, setWest] = useState(-180);
  const [east, setEast] = useState(180);
  const [south, setSouth] = useState(-90);

  const handleAreaOptionChange = (event) => {
    const value = event.target.value;
    setAreaOption(value);
    if (value === "wholeRegion") {
      setSelectedArea("");
    } else {
      setSelectedArea([north, east, west, south]);
    }
  };

  const handleNorthChange = (event) => {
    const value = event.target.value.trim(); // Remove leading/trailing whitespace
    if (value === "" || value === "-") {
      setNorth(value); // Keep the "-" sign as the input value
      setSelectedArea([value, east, west, south]);
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setNorth(parsedValue);
        setSelectedArea([parsedValue, east, west, south]);
      }
    }
  };

  const handleWestChange = (event) => {
    const value = event.target.value.trim(); // Remove leading/trailing whitespace
    if (value === "" || value === "-") {
      setWest(value); // Keep the "-" sign as the input value
      setSelectedArea([north, east, value, south]);
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setWest(parsedValue);
        setSelectedArea([north, east, parsedValue, south]);
      }
    }
  };

  const handleEastChange = (event) => {
    const value = event.target.value.trim(); // Remove leading/trailing whitespace
    if (value === "" || value === "-") {
      setEast(value); // Keep the "-" sign as the input value
      setSelectedArea([north, value, west, south]);
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setEast(parsedValue);
        setSelectedArea([north, parsedValue, west, south]);
      }
    }
  };

  const handleSouthChange = (event) => {
    const value = event.target.value.trim(); // Remove leading/trailing whitespace
    if (value === "" || value === "-") {
      setSouth(value); // Keep the "-" sign as the input value
      setSelectedArea([north, east, west, value]);
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setSouth(parsedValue);
        setSelectedArea([north, east, west, parsedValue]);
      }
    }
  };

  const handleCoordinateChange = (coordinate, value) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      coordinate(parsedValue);
      setSelectedArea([north, east, west, south]);
    } else {
      coordinate(0);
    }
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Geographical area</Typography>
      <FormLabel>At least one selection must be made</FormLabel>

      <RadioGroup
        name="area"
        value={areaOption}
        data={selectedArea}
        onChange={handleAreaOptionChange}
      >
        <FormControlLabel
          value="wholeRegion"
          control={<Radio />}
          label="Whole available region"
        />
        <FormControlLabel
          value="subRegion"
          control={<Radio />}
          label="Sub-region extraction"
        />
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField
              type="number"
              label="North"
              value={north}
              onChange={handleNorthChange}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField
              type="number"
              label="East"
              value={east}
              onChange={handleEastChange}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField
              type="number"
              label="West"
              value={west}
              onChange={handleWestChange}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField
              type="number"
              label="South"
              value={south}
              onChange={handleSouthChange}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
        </Grid>
      </RadioGroup>
    </Box>
  );
};

/**
 * FormatComponent component renders a section for selecting and managing format type for the download file.
 *
 * @returns {JSX.Element} - FormatComponent
 */
const FormatComponent = () => {
  const [selectedFormat, setSelectedFormat] = useState("zip");

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Format</Typography>
      <FormLabel>At least one selection must be made</FormLabel>

      <RadioGroup
        name="format"
        value={selectedFormat}
        onChange={handleFormatChange}
        row
      >
        <FormControlLabel
          value="zip"
          control={<Radio />}
          label="Zip file (.zip)"
        />
        <FormControlLabel
          value="tar"
          control={<Radio />}
          label="Compressed tar file (.tar.gz)"
        />
      </RadioGroup>
    </Box>
  );
};

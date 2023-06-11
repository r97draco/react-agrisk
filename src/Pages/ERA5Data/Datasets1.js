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
 * Creates forms, handles error, sends the data to api, receives the file and displays it so that user can download thes file.
 * 
 * @returns {JSX.Element} - Datasets1 component 
 */
const Datasets1 = () => {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState("File Name");
  const [selectedVariables, setSelectedVariables] = useState(["cloud_cover"]);
  const [selectedStatistics, setSelectedStatistics] = useState(["24_hour_maximum"]);
  const [selectedYears, setSelectedYears] = useState(['2022']);
  const [selectedMonths, setSelectedMonths] = useState(['01']);
  const [selectedDays, setSelectedDays] = useState(['01']);
  const [selectedTimes, setSelectedTimes] = useState(["12_00"]);
  const [selectedArea, setSelectedArea] = useState("");

  const [formErrors, setFormErrors] = useState({
    variable: false,
    statistic: false,
    year: false,
    month: false,
    day: false,
    time: false,
    area: false,
    format: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const variable = data.get("variable");
    const statistic = data.get("statistic");
    const year = data.get("year");
    const month = data.get("month");
    const day = data.get("day");
    const time = data.get("time");
    const area = data.get("area");
    const format = data.get("format");

    const errors = {
      variable: !variable,
      statistic: !statistic,
      year: !year,
      month: !month,
      day: !day,
      time: !time,
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
      variable: selectedVariables,
      statistic: selectedStatistics,
      years: selectedYears,
      month: selectedMonths,
      day: selectedDays,
      time: selectedTimes,
      format: format,
    };
    if (area === 'subRegion') {
      payload.area = selectedArea;
    }
    console.log(payload);
  };

  return (
    <>
      <div className="items-center block m-3 text-left">
        <Typography variant="body1">Data Set 1</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          noValidate
          alignContent="center"
          justifyContent="center"
        >
          <FormControl error={formErrors.error}>
            <FormControl error={formErrors.variable}>
              <VariableSelection
                selectedVariables={selectedVariables}
                setSelectedVariables={setSelectedVariables}
              />
            </FormControl>
            <FormControl error={formErrors.statistic}>
              <StatisticComponent
                selectedStatistics={selectedStatistics}
                setSelectedStatistics={setSelectedStatistics}
              />
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
            <FormControl error={formErrors.time}>
              <TimeComponent
                selectedTimes={selectedTimes}
                setSelectedTimes={setSelectedTimes}
              />
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
export default Datasets1;

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

/**
* VariableSelection component renders a section for selecting and managing variables.
*
* @param {Object} props - Component props
* @param {Array} props.selectedVariables - Array of selected variables
* @param {function} props.setSelectedVariables - Callback function to update the selected variables state
* @returns {JSX.Element} - VariableSelection component
*/
const VariableSelection = ({ selectedVariables, setSelectedVariables }) => {
  const Variable = [
    "Cloud cover",
    "Precipitation flux",
    "Liquid precipitation duration fraction",
    "Solid precipitation duration fraction",
    "Snow thickness LWE",
    "Snow thickness",
    "Solar radiation flux",
    "Vapour pressure",
    "2m temperature",
    "10m wind speed",
    "2m dewpoint temperature",
    "2m relative humidity",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const formattedValue = value.toLowerCase().replace(/ /g, "_"); // Format the variable name

    if (checked) {
      setSelectedVariables((prevSelectedVariables) => [
        ...prevSelectedVariables,
        formattedValue,
      ]);
    } else {
      setSelectedVariables((prevSelectedVariables) =>
        prevSelectedVariables.filter((variable) => variable !== formattedValue)
      );
    }
  };

  const handleSelectAll = () => {
    const formattedVariables = Variable.map((item) =>
      item.toLowerCase().replace(/ /g, "_")
    );
    setSelectedVariables(formattedVariables);
  };

  const handleClearAll = () => {
    setSelectedVariables([]);
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Variable</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {Variable.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item}
            name="variable"
            className="w-full p-2 lg:w-1/4 md:w-1/3 sm:w-1/2"
            control={
              <Checkbox
                checked={selectedVariables.includes(
                  item.toLowerCase().replace(/ /g, "_")
                )}
                onChange={handleCheckboxChange}
              />
            }
            label={item}
          />
        ))}
      </div>
      <Button onClick={handleClearAll}>Clear All</Button>
      <Button onClick={handleSelectAll}>Select All</Button>
    </Box>
  );
};

/**
* StatisticComponent component renders a section for selecting and managing statistics.
* 
* @param {Object} props - Component props
* @param {Array} props.selectedStatistics - Array of selected statistics
* @param {function} props.setSelectedStatistics - Callback function to update the selected statistics state
* @returns {JSX.Element} - StatisticComponent component
*/
const StatisticComponent = ({ selectedStatistics, setSelectedStatistics }) => {
  const statistic = [
    "24 hour maximum",
    "24 hour minimum",
    "Day time mean",
    "Night time minimum",
    "24 hour mean",
    "Day time maximum",
    "Night time mean",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const formattedValue = value.toLowerCase().replace(/ /g, "_");

    if (checked) {
      setSelectedStatistics((prevSelectedStatistics) => [
        ...prevSelectedStatistics,
        formattedValue,
      ]);
    } else {
      setSelectedStatistics((prevSelectedStatistics) =>
        prevSelectedStatistics.filter((variable) => variable !== formattedValue)
      );
    }
  };

  const handleSelectAll = () => {
    const formattedStatistics = statistic.map((item) =>
      item.toLowerCase().replace(/ /g, "_")
    );
    setSelectedStatistics(formattedStatistics);
  };

  const handleClearAll = () => {
    setSelectedStatistics([]);
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Statistic</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {statistic.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item}
            name="statistic"
            control={
              <Checkbox
                checked={selectedStatistics.includes(
                  item.toLowerCase().replace(/ /g, "_")
                )}
                onChange={handleCheckboxChange}
              />
            }
            className="w-full p-2 lg:w-1/4 md:w-1/3 sm:w-1/2"
            label={item}
          />
        ))}
      </div>
      <Button onClick={handleClearAll}>Clear All</Button>
      <Button onClick={handleSelectAll}>Select All</Button>
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
    setSelectedYears(years.map(year => year.toString()));
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
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
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
        return prevSelectedMonths.filter((selectedMonth) => selectedMonth !== value);
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
* TimeComponent component renders a section for selecting and managing time.
*
* @param {Object} props - Component props
* @param {Array} props.selectedTimes - Array of selected times
* @param {function} props.setSelectedTimes - Callback function to update the selected time state
* @returns {JSX.Element} - TimeComponent component
*/
const TimeComponent = ({ selectedTimes, setSelectedTimes }) => {
  const times = ["06:00", "09:00", "12:00", "15:00", "18:00"];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}_${minutes}`;
  };

  const handleSelectAll = () => {
    setSelectedTimes(times.map(formatTime));
  };

  const handleClearAll = () => {
    setSelectedTimes([]);
  };

  const handleTimeSelection = (time) => {
    setSelectedTimes((prevSelectedTimes) => {
      const formattedTime = formatTime(time);
      if (prevSelectedTimes.includes(formattedTime)) {
        return prevSelectedTimes.filter((selectedTime) => selectedTime !== formattedTime);
      } else {
        return [...prevSelectedTimes, formattedTime];
      }
    });
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Time</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {times.map((time, index) => (
          <FormControlLabel
            key={index}
            value={formatTime(time)}
            name="time"
            className="w-full p-2 lg:w-1/8 md:w-1/6 sm:w-1/3"
            control={
              <Checkbox
                checked={selectedTimes.includes(formatTime(time))}
                onChange={() => handleTimeSelection(time)}
              />
            }
            label={time}
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
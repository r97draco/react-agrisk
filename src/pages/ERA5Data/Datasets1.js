import { FormGroup, Typography } from "@material-ui/core";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";
import "../../App.css";
import { FormControl, FormLabel } from "@mui/material";

const Variable = [];

const Datasets1 = () => {
  const [error, setError] = useState(false);
  const [variableValue, setVariableValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (variableValue === "") {
      setError(true);
    }
    console.log({
      variable: data.get("variable"),
      error: error,
    });
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
          <FormControl error={error}>
            <VariableSelection />
            <StatisticComponent />
            <YearComponent />
            <MonthComponent />
            <DayComponent />
            <TimeComponent />
            <GeographicalAreaComponent />
            <FormatComponent />

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default Datasets1;

const MonthComponent = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonths, setSelectedMonths] = useState([]);

  function handleSelectAll() {
    setSelectedMonths(months);
  }

  function handleClearAll() {
    setSelectedMonths([]);
  }

  function handleMonthSelection(month) {
    setSelectedMonths((prevSelectedMonths) => {
      if (prevSelectedMonths.includes(month)) {
        return prevSelectedMonths.filter(
          (selectedMonth) => selectedMonth !== month
        );
      } else {
        return [...prevSelectedMonths, month];
      }
    });
  }

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Month</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {months.map((month, index) => (
          <FormControlLabel
            key={index}
            value={month}
            className="w-full p-2 lg:w-1/8 md:w-1/6 sm:w-1/3"
            control={
              <Checkbox
                checked={selectedMonths.includes(month)}
                onChange={() => handleMonthSelection(month)}
              />
            }
            label={month}
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

const DayComponent = () => {
  const days = [...Array(31).keys()].map((day) => day + 1);

  const [selectedDays, setSelectedDays] = useState([]);

  function handleSelectAll() {
    setSelectedDays(days);
  }

  function handleClearAll() {
    setSelectedDays([]);
  }

  function handleDaySelection(day) {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  }

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Day</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {days.map((day, index) => (
          <FormControlLabel
            key={index}
            value={day.toString()}
            className="w-full p-2 lg:w-1/8 md:w-1/6 sm:w-1/3"
            control={
              <Checkbox
                checked={selectedDays.includes(day)}
                onChange={() => handleDaySelection(day)}
              />
            }
            label={day.toString()}
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

const TimeComponent = () => {
  const times = ["06:00", "09:00", "12:00", "15:00", "18:00"];

  const [selectedTimes, setSelectedTimes] = useState([]);

  function handleSelectAll() {
    setSelectedTimes(times);
  }

  function handleClearAll() {
    setSelectedTimes([]);
  }

  function handleTimeSelection(time) {
    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(time)) {
        return prevSelectedTimes.filter(
          (selectedTime) => selectedTime !== time
        );
      } else {
        return [...prevSelectedTimes, time];
      }
    });
  }

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Time</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {times.map((time, index) => (
          <FormControlLabel
            key={index}
            value={time}
            className="w-full p-2 lg:w-1/8 md:w-1/6 sm:w-1/3"
            control={
              <Checkbox
                checked={selectedTimes.includes(time)}
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

const YearComponent = () => {
  const startYear = 1979;
  const endYear = 2022;
  const years = [...Array(endYear - startYear + 1)].map(
    (_, index) => startYear + index
  );

  const [selectedYears, setSelectedYears] = useState([]);

  function handleSelectAll() {
    setSelectedYears(years);
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
            value={year.toString()}
            control={
              <Checkbox
                checked={selectedYears.includes(year)}
                onChange={() => {
                  setSelectedYears((prevSelectedYears) => {
                    if (prevSelectedYears.includes(year)) {
                      return prevSelectedYears.filter(
                        (selectedYear) => selectedYear !== year
                      );
                    } else {
                      return [...prevSelectedYears, year];
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

const StatisticComponent = () => {
  const statistic = [
    "24 hour maximum",
    "24 hour minimum",
    "Day time mean",
    "Night time minimum",
    "24 hour mean",
    "Day time maximum",
    "Night time mean",
  ];

  const [selectedStatistics, setSelectedStatistics] = useState([]);

  function handleSelectAll() {
    setSelectedStatistics(statistic);
  }

  function handleClearAll() {
    setSelectedStatistics([]);
  }

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Statistic</Typography>
      <FormLabel>At least one selection must be made</FormLabel>
      <div>
        {statistic.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item}
            control={
              <Checkbox
                checked={selectedStatistics.includes(item)}
                onChange={() => {
                  setSelectedStatistics((prevSelectedStatistics) => {
                    if (prevSelectedStatistics.includes(item)) {
                      return prevSelectedStatistics.filter(
                        (selectedStatistic) => selectedStatistic !== item
                      );
                    } else {
                      return [...prevSelectedStatistics, item];
                    }
                  });
                }}
              />
            }
            className="w-full p-2 lg:w-1/4 md:w-1/3 sm:w-1/2"
            label={item}
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

const GeographicalAreaComponent = () => {
  const [areaOption, setAreaOption] = useState("wholeRegion");
  const [north, setNorth] = useState("");
  const [west, setWest] = useState("");
  const [east, setEast] = useState("");
  const [south, setSouth] = useState("");

  const handleAreaOptionChange = (event) => {
    setAreaOption(event.target.value);
  };

  const handleNorthChange = (event) => {
    setNorth(event.target.value);
  };

  const handleWestChange = (event) => {
    setWest(event.target.value);
  };

  const handleEastChange = (event) => {
    setEast(event.target.value);
  };

  const handleSouthChange = (event) => {
    setSouth(event.target.value);
  };

  return (
    <Box className="p-2 mb-3 rounded-md shadow-lg bg-gray-50">
      <Typography>Geographical area</Typography>
      <FormLabel>At least one selection must be made</FormLabel>

      <RadioGroup
        name="areaOption"
        value={areaOption}
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
      </RadioGroup>
      {areaOption === "subRegion" && (
        <>
          <TextField label="North" value={north} onChange={handleNorthChange} />
          <TextField label="West" value={west} onChange={handleWestChange} />
          <TextField label="East" value={east} onChange={handleEastChange} />
          <TextField label="South" value={south} onChange={handleSouthChange} />
        </>
      )}
    </Box>
  );
};

const FormatComponent = () => {
  const [selectedFormat, setSelectedFormat] = useState("");

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

const VariableSelection = () => {
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
  const [selectedVariables, setSelectedVariables] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedVariables((prevSelectedVariables) => [
        ...prevSelectedVariables,
        value,
      ]);
    } else {
      setSelectedVariables((prevSelectedVariables) =>
        prevSelectedVariables.filter((variable) => variable !== value)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectedVariables(Variable);
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
            className="w-full p-2 lg:w-1/4 md:w-1/3 sm:w-1/2"
            control={
              <Checkbox
                checked={selectedVariables.includes(item)}
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

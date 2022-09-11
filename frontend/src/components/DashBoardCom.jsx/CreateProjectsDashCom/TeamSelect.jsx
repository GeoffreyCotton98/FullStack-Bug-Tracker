import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ users, team, setTeam }) {
  const theme = useTheme();

  const handleTeam = (event) => {
    const {
      target: { value },
    } = event;
    setTeam(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">Team Members:</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={team}
          onChange={handleTeam}
          input={<OutlinedInput label="Team Members:" />}
          MenuProps={MenuProps}
        >
          {users
            .filter((user) => user.role !== "Admin")
            .map((user) => (
              <MenuItem
                key={user._id}
                value={user._id}
                style={getStyles(user, team, theme)}
              >
                {user.lastName},{user.firstName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

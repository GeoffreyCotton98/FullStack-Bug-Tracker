import React from "react";

function SelectPM({ users }) {
  return (
    <TextField
      id="ticketType"
      margin="normal"
      fullWidth
      select
      value={type}
      onChange={handleType}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">Project Manager:</InputAdornment>
        ),
      }}
    >
      {users.map((user) => (
        <MenuItem key={user._id} value={user._id}>
          {user.lastName}, {user.firstName}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default SelectPM;

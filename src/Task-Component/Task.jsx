import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const theme = createTheme();

// LocalStorage

const getLocalData = () => {
  const listTasks = localStorage.getItem("tasksList");
  if (listTasks) {
    return JSON.parse(listTasks);
  } else {
    return [];
  }
};

export default function Task() {
  const [add, setAdd] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItems, setIsEditItems] = useState(null);
  const [searchTask, setSearchTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Add: data.get("Add"),
    });
  };

  const handleChange = (event) => {
    setAdd(event.target.value);
  };

  // Add your tasks

  const addTasks = () => {
    if (!add) {
      alert("Please list your tasks");
    } else if (add && isEditItems) {
      setItems(
        items.map((currentElement) => {
          if (currentElement.id === isEditItems) {
            return { ...currentElement, name: add };
          }
          return currentElement;
        })
      );
      setAdd("");
      setIsEditItems(null);
    } else {
      const myNewTasks = {
        id: new Date().getTime().toString(),
        name: add,
      };
      setItems([...items, myNewTasks]);
      setAdd("");
    }
  };

  // Edit your tasks

  const editItem = (index) => {
    const newEditItem = items.find((currentElement) => {
      return currentElement.id === index;
    });
    setAdd(newEditItem.name);
    setIsEditItems(index);
  };

  // Delete your tasks

  const deleteItem = (index) => {
    const updatedItem = items.filter((currentElement) => {
      return currentElement.id !== index;
    });
    setItems(updatedItem);
  };

  // Clear all your tasks

  const doneTasks = () => {
    setItems([]);
  };

  // localStorage

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(items));
  }, [items]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AddCircleIcon />
          </Avatar>
          <Typography>
            Hey there! Start adding your daily tasks below.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Add"
              label="Add"
              name="Add"
              autoComplete="Add"
              autoFocus
              onChange={handleChange}
              value={add}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Search"
              label="Search"
              name="Search"
              autoComplete="Search"
              autoFocus
              onChange={(event) => {
                setSearchTask(event.target.value);
              }}
              value={searchTask}
            />
            <Button
              onClick={addTasks}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add your Tasks
            </Button>
            <Button
              onClick={doneTasks}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Clear all Tasks
            </Button>
            <Grid container>
              <Grid
                item
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#00aeff",
                  color: "white",
                  borderRadius: ".3rem",
                }}
              >
                {items
                  .filter((currentElement) => {
                    if (searchTask === "") {
                      return currentElement;
                    } else if (
                      currentElement.name
                        .toLowerCase()
                        .includes(searchTask.toLowerCase())
                    ) {
                      return currentElement;
                    }
                  })
                  .map((currentElement) => {
                    return (
                      <>
                        <div key={currentElement.id}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px 5px 10px 5px",
                              cursor: "pointer",
                            }}
                          >
                            {currentElement.name} &nbsp;&nbsp; &nbsp;&nbsp;
                            <div
                              style={{
                                width: "60px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <EditIcon
                                onClick={() => editItem(currentElement.id)}
                              />
                              <DeleteIcon
                                onClick={() => deleteItem(currentElement.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

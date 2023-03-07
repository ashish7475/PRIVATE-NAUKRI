import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Pagination,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "./filtermenu.css";

const FilterMenu = (props) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState({
    internship: false,
    fullTime: false,
  });
  const [companies, setCompanies] = React.useState({
    Amazon: false,
    Google: false,
    Flipkart: false,
    Apple: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompanyCheckbox = (e) => {
    if (e.target.name == "Amazon") {
      setCompanies((prev) => ({ ...prev, Amazon: !prev.Amazon }));
    } else if (e.target.name == "Google") {
      setCompanies((prev) => ({ ...prev, Google: !prev.Google }));
    } else if (e.target.name == "Flipkart") {
      setCompanies((prev) => ({ ...prev, Flipkart: !prev.Flipkart }));
    } else if (e.target.name == "Apple") {
      setCompanies((prev) => ({ ...prev, Apple: !prev.Apple }));
    }
  };
  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  useEffect(() => {
    props.setFilters((prev) => ({
      ...prev,
      type: type.internship ? "Internship" : type.fullTime ? "Full Time" : "",
    }));
  }, [type]);
  useEffect(() => {
    props.setFilters((prev) => {
      let comp = [];
      if (companies.Amazon) {
        comp.push("Amazon");
      }
      if (companies.Google) {
        comp.push("Google");
      }
      if (companies.Flipkart) {
        comp.push("Flipkart");
      }
      if (companies.Apple) {
        comp.push("Apple");
      }
      return { ...prev, companies: comp };
    });
  }, [companies]);

  
  const handleTypeCheckBox = (e) => {
    if (e.target.name === "internship") {
      setType((prev) => ({ ...prev, internship: !prev.internship }));
    } else {
      setType((prev) => ({ ...prev, fullTime: !prev.fullTime }));
    }
  };

  return (
    <div className="filter__menu">
      <Button
        className="filter__btn"
        variant="outlined"
        startIcon={<FilterAltIcon />}
        onClick={handleClickOpen}
      >
        Filter
      </Button>
      <Pagination
        className="pagination"
        onChange={handlePageChange}
        page={props.currentPage}
        style={{ boxShadow: "0 0 0 !important" }}
        count={Math.ceil(props.from==='Applied'?props.totalRecords/10.0 : props.totalRecords / 12.0)}
        color="secondary"
      />
      <div class="search__bar">
        <input
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          name="search"
          value={props.search}
          onChange={props.handleSearch}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h3>Filters</h3>
        </DialogTitle>

        <form className="filters_form">
          <label>
            <h5>Type of job</h5>
          </label>
          <div className="form__row">
            <FormControlLabel
              label="Internship"
              control={
                <Checkbox
                  name="internship"
                  checked={type.internship}
                  onChange={handleTypeCheckBox}
                  value={"Internship"}
                  disabled={type.fullTime ? true : false}
                />
              }
            />
            <FormControlLabel
              label="Full Time"
              control={
                <Checkbox
                  name="fullTime"
                  checked={type.fullTime}
                  onChange={handleTypeCheckBox}
                  value={"Full Time"}
                  disabled={type.internship ? true : false}
                />
              }
            />
          </div>
          <label>
            <h5 style={{ marginTop: "10px" }}>Company</h5>
          </label>
          <div className="form__row">
            <FormControlLabel
              label="Amazon"
              control={
                <Checkbox
                  name="Amazon"
                  checked={companies.Amazon}
                  onChange={handleCompanyCheckbox}
                  value={"Google"}
                />
              }
            />
            <FormControlLabel
              label="Google"
              control={
                <Checkbox
                  name="Google"
                  checked={companies.Google}
                  onChange={handleCompanyCheckbox}
                  value={"Google"}
                />
              }
            />
            <FormControlLabel
              label="Flipkart"
              control={
                <Checkbox
                  name="Flipkart"
                  checked={companies.Flipkart}
                  onChange={handleCompanyCheckbox}
                  value={"Flipkart"}
                />
              }
            />
            <FormControlLabel
              label="Apple"
              control={
                <Checkbox
                  name="Apple"
                  checked={companies.Apple}
                  onChange={handleCompanyCheckbox}
                  value={"Apple"}
                />
              }
            />
          </div>
          <button type="button" class="btn btn-primary" onClick={handleClose}>
            Done
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={handleClose}
          >
            Cancel
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default FilterMenu;

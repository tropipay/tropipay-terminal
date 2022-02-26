import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import FormTextFilter from "../../app/components/FormControl/FormTextFilter";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "mdi-react/ExpandMoreIcon";
import MovementItem from "./MovementItem";

import srvMovement from "../services/MovementSlice";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import moment from "moment/moment";
import "moment/locale/es";

import ContentHeader from "../../app/components/Header/ContentHeader";
import "./MovementPage.scss";

function MovementPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const movements = useSelector(srvMovement.selector.list);
  const completed = useSelector(srvMovement.selector.completed);
  const limit = useSelector(srvMovement.selector.limit);
  const offset = useSelector(srvMovement.selector.offset);
  const isLoading = useSelector(srvMovement.selector.isLoading);
  const isEmpty = useSelector(srvMovement.selector.isEmpty);
  const data = useSelector(srvMovement.selector.data);
  const query = useSelector(srvMovement.selector.query);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!data && !isLoading) {
      dispatch(srvMovement.action.load());
    }
    if(inputRef && inputRef.current) {
      // inputRef.current.focus();
    }
  });

  function onSelectItem(item) { }

  function loadMore() {
    dispatch(
      srvMovement.action.load(parseInt(offset) + parseInt(limit), limit, filter)
    );
  }

  function onChangeFilter(value) {
    setFilter(value);
    if (value === "") {
      onClean();
    }
  }

  function onSearch(text) {
    dispatch(
      srvMovement.action.search(
        srvMovement.default.offset,
        srvMovement.default.limit,
        text
      )
    );
  }

  function onClean() {
    dispatch(srvMovement.action.search());
  }

  function notAllowed() {
    return false;
  }

  const renderData = () => {
    return (
      <Grid container className="movement-data">
        {!isLoading ? (
          <Grid item xs={12} className="movement-data-filter">
            <FormTextFilter
              id="criteria"
              name="criteria"
              placeholder={t("movement.search")}
              onSearch={onSearch}
              onClean={onClean}
              onChange={onChangeFilter}
              ref={inputRef}
              value={query} 
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch(e.target.value);
                  e.preventDefault();
                }
              }}
            />
          </Grid>
        ) : null}

        {isEmpty && query ? (
          <Grid item xs={12}>
            {t("movement.noResults")}
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <List className="list marginB2">
            {isLoading && movements.length < 1 ? (
              <LinearProgress className="my-5" />
            ) : (
              movements.map(item =>
                item ? (
                  <MovementItem
                    className="movement-item"
                    key={item.id}
                    data={item}
                    onSelect={onSelectItem}
                  />
                ) : null
              )
            )}
          </List>
        </Grid>

        {!isLoading && !completed ? (
          <Grid item xs={12}>
            <Typography
              onClick={() => loadMore()}
              className="box box-vertical box-align-center btn-txt box-label-bold"
            >
              {t("movement.showMore")}
              <ExpandMoreIcon />
            </Typography>
          </Grid>
        ) : null}
      </Grid>
    );
  };

  const renderNoData = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" className="text-center">
            {t("movement.text")}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            component={Link}
            to={"/payment"}
            variant="contained"
            className="mt2 btn-full-width"
            onClick={() => {
              /*
                track("goToBookingChargeFromHistory");
                AppActions.Page("home");
              */
            }}
            size="large"
            disabled={notAllowed()}
            color="primary"
          >
            {t("movement.btn")}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className="page-margin page-padding">
      <Grid container >
        <Grid item xs={12}>
          <ContentHeader title={moment().format(`dddd, D [${t("movement.nex")}] MMMM`)} />
        </Grid>

        <Grid item xs={12} className="movement-content">
          {isEmpty && (!query || query === "") ? renderNoData() : renderData()}
        </Grid>
      </Grid>
    </div>
  );
}

export default MovementPage;

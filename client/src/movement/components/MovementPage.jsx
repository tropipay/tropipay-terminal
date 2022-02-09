import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import TextFilter from "./TextFilter";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "mdi-react/ExpandMoreIcon";
import MovementItem from "./MovementItem";

import srvMovement from "../services/MovementSlice";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import moment from "moment/moment";
import ContentHeader from "../../app/components/Header/ContentHeader";

function MovementPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const movements = useSelector(srvMovement.selector.list);
  const completed = useSelector(srvMovement.selector.completed);
  const limit = useSelector(srvMovement.selector.limit);
  const offset = useSelector(srvMovement.selector.offset);
  const isLoading = useSelector(srvMovement.selector.isLoading);
  const isEmpty = useSelector(srvMovement.selector.isEmpty);
  const data = useSelector(srvMovement.selector.data);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!data && !isLoading) {
      dispatch(srvMovement.action.load());
    }
  });

  function onSelectItem(item) {}

  function loadMore() {
    dispatch(
      srvMovement.action.load(parseInt(offset) + parseInt(limit), limit, filter)
    );
  }

  function onChangeFilter(value) {
    setFilter(value);
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFilter
            onSearch={onSearch}
            onClean={onClean}
            onChange={onChangeFilter}
          />
        </Grid>

        <Grid item xs={12}>
          <List className="list marginB2">
            {isLoading && movements.length < 1 ? (
              <LinearProgress className="my-5" />
            ) : (
              movements.map(item => item ? (
                <MovementItem
                  key={item.id}
                  data={item}
                  onSelect={onSelectItem}
                />
              ) : null)
            )}
          </List>
        </Grid>

        {!completed ? (
          <Grid item xs={12}>
            <Typography
              onClick={() => loadMore()}
              className="box box-vertical box-align-center btn-txt"
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" className="text-center my-5">
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ContentHeader title={moment().format("ll")} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" className="">
            {t("movement.title")}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {!isEmpty ? renderData() : renderNoData()}
        </Grid>
      </Grid>
    </div>
  );
}

export default MovementPage;

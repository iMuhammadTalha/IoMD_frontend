import React, { Component } from "react";
import {Paper, Typography} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

class caretaker extends Component {

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        const url = "user/caretaker/get-total-caretakers";

        this.props.getTotalCareTaker(url);
    }

    render() {
        const { caretaker } = this.props;
        return (
            <Paper className="w-full rounded-8 border-1">
                {this.props.user.role[0] !== "fleet" &&
                <div className="flex items-center justify-end pr-4 pl-16 pt-4">
                    <IconButton aria-label="more" onClick={this.refreshData}>
                        <Icon>refresh</Icon>
                    </IconButton>
                </div>
                }
                <div className="text-center pt-12 pb-28" style={{overflow: "auto"}}>
                    <Typography
                        className="text-56 leading-none text-purple-dark">{caretaker ? caretaker : 0}</Typography>
                    <Typography className="text-16" color="textSecondary"><h1>Care Taker</h1></Typography>
                </div>
            </Paper>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getTotalCareTaker: Actions.getTotalCareTaker
        },
        dispatch
    );
}

function mapStateToProps({ DashBoardApp, auth }) {
    return {
        caretaker: DashBoardApp.DashboardReducer.caretaker,
        user: auth.user
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(caretaker)
);

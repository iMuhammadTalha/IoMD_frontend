import React, { Component } from "react";
import {Paper, Typography} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

class doctor extends Component {

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        const url = "user/doctor/get-total-doctors";

        this.props.getTotalDoctor(url);
    }

    render() {
        const { doctor } = this.props;
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
                        className="text-56 leading-none text-purple-dark">{doctor ? doctor : 0}</Typography>
                    <Typography className="text-16" color="textSecondary"><h1>Doctor</h1></Typography>
                </div>
            </Paper>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getTotalDoctor: Actions.getTotalDoctor
        },
        dispatch
    );
}

function mapStateToProps({ DashBoardApp, auth }) {
    return {
        doctor: DashBoardApp.DashboardReducer.doctor,
        user: auth.user
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(doctor)
);

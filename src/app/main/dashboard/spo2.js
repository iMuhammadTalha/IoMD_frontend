import React, { Component } from "react";
import {Paper, Typography} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

class SPO2 extends Component {

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        let patient_id = localStorage.getItem('id');

        const url = "vital/get-a-recent-vital/"+patient_id;

        this.props.getPatientRecentVital(url);
    }

    render() {
        const { spo2 } = this.props;
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
                        className="text-56 leading-none text-purple-dark">{spo2 ? spo2 : 0}</Typography>
                    <Typography className="text-16" color="textSecondary"><h3>%</h3></Typography>
                    <Typography className="text-16" color="textSecondary"><h1>SpO2</h1></Typography>
                </div>
            </Paper>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getPatientRecentVital: Actions.getPatientRecentVital
        },
        dispatch
    );
}

function mapStateToProps({ DashBoardApp, auth }) {
    return {
        spo2: DashBoardApp.DashboardReducer.spo2,
        user: auth.user
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SPO2)
);

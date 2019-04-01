import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-candidates';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import * as utility from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import manUser from '../../assets/img/man-user.png';

class Candidates extends Component {
    // initiate input field's properties
    state = {
        searchForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please search by name, status, position applied'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },

        },
        formIsValid: false
    }

    componentDidMount() {
        // initiate candidates from server
        this.props.onFetchCandidates(this.props.location.search);
    }

    // filter candidates and update url
    filterCandidatesHandler = (event) => {
        this.props.onFilterCandidates(event.target.value, this.props.history);
    }

    // sort candidates in asc or order and update url
    sortCandidatesHandler = (colName, sortType) => {
        this.props.onSortCandidates(colName, sortType, this.props.history);
    }

    // to dismiss error popup msg
    errorConfirmedHandler = () => {
        this.setState({ error: null });
    }

    render() {
        // spinner will load while getting
        // response from server
        let candidates = <Spinner />;

        // assign table when when got 
        // response from server
        if (!this.props.loading) {
            candidates = <Table
                caption=""
                headerCells={utility.getCandidateTableHeaderCells()}
                footerCells={utility.getCandidateTableHeaderCells()}
                data={this.props.candidates}
                showFooter={false}
                sortedUporDown={this.sortCandidatesHandler}
            />

            // if error occurs load modal
            if (this.props.error) {
                candidates = <Modal
                    show={this.props.error}
                    modalClosed={() => this.props.onfetchCandidatesFail(null)}>
                    {this.props.error ? this.props.error.message : null}
                </Modal>
            }
        }

        return (
            <div>
                <h3>
                    <img src={manUser} alt="Applicant" />
                    Applications
                </h3>
                <Input
                    elementType={this.state.searchForm.name.elementType}
                    touched={this.state.searchForm.name.touched}
                    elementConfig={this.state.searchForm.name.elementConfig}
                    changed={(event) => this.filterCandidatesHandler(event)} />

                {candidates}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        candidates: state.candidate.candidates,
        loading: state.candidate.loading,
        error: state.candidate.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCandidates: (values) => dispatch(actions.fetchCandidates(values)),
        onSortCandidates: (colName, sortType, history) => dispatch(actions.sortCandidatesUpdateUrl(colName, sortType, history)),
        onFilterCandidates: (val, history) => dispatch(actions.filterCandidatesUpdateUrl(val, history)),
        onfetchCandidatesFail: (error) => dispatch(actions.fetchCandidatesFail(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Candidates, axios));
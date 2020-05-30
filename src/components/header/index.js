import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLanguage } from '../../actions';
import { constants } from '../../data/constants';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    handleChange = (e) => {
        this.props.selectLanguage(e.target.value);
        this.setState({ selectedLanguage: e.target.value });
    };

    render() {
        return (
            <div>
                <h3> Header </h3>
                <label> Language </label>
                <select value={this.state.selectedLanguage} onChange={this.handleChange}>
                    {constants.languages.map((language, key) =>
                        <option key={key} value={language}>{language}</option>
                    )}
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => { return state };

const mapDispatchToProps = {
    selectLanguage
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Header)
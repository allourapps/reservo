import React, { Component } from 'react';

import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/RaisedButton';

import Header from 'atoms/header';

import { Col, Row } from 'molecules/grid';

import { doLogin } from 'reducers/login/index';

@connect(null, { doLogin })
export default class Login extends Component {
    render() {
        console.log(this.props);
        return (
            <fb className="App grow">
                <Paper zDepth={1}>
                    <fb className="pad1">
                        <Row>
                            <Col xs={12}>
                                <Header title="Please Log In"/>
                            </Col>
                            <Col xs={12}>
                                <TextField
                                    style={{
                                        width: '100%'
                                    }}
                                    hintText="Login field"
                                    floatingLabelText="Login"
                                    type="text"
                                />
                            </Col>
                            <Col xs={12}>
                                <TextField
                                    style={{
                                        width: '100%'
                                    }}
                                    hintText="Password Field"
                                    floatingLabelText="Password"
                                    type="password"
                                />
                            </Col>
                            <Col xs={12}>
                                <Button
                                    label="Login"
                                    primary={true}
                                    fullWidth={true}
                                    onClick={() => {
                                        this.props.doLogin({

                                        })
                                    }}
                                />
                            </Col>
                        </Row>
                    </fb>
                </Paper>
            </fb>
        );
    }
}

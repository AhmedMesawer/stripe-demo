import React, { Component } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity } from 'react-native';

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    SignIn() {
        if (this.state.email !== '' && this.state.password !== '') {
            var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
            var authenticationData = {
                Username: this.state.email,
                Password: this.state.password,
            };
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            var poolData = {
                UserPoolId: 'us-east-1_zmyxcklLE',
                ClientId: '4ssimhn5pqkjcga5u59ffgi20s'
            };
            var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
            var userData = {
                Username: this.state.email,
                Pool: userPool
            };
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    var accessToken = result.getAccessToken().getJwtToken();
                    console.log('accessToken: ', accessToken);
                    /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                    var idToken = result.idToken.jwtToken;
                    console.log('idToken: ', idToken);
                },

                onFailure: function (err) {
                    alert(err);
                },

            });
        } else {
            alert('Enter email and password');
        }
    }

    navToSignUp() {
        this.props.navigation.navigate('signup');
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        width: 350,
                        borderWidth: 0.25,
                        borderColor: '#000',
                        borderRadius: 30,
                        marginBottom: 8,
                        padding: 8
                    }}
                    placeholder="Email"
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    style={{
                        width: 350,
                        borderWidth: 0.25,
                        borderColor: '#000',
                        borderRadius: 30,
                        marginBottom: 16,
                        padding: 8
                    }}
                    secureTextEntry={true}
                    placeholder="Password"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(password) => this.setState({ password })}
                />
                <TouchableOpacity
                    style={{
                        width: 200,
                        height: 45,
                        borderRadius: 30,
                        backgroundColor: '#1da1f2',
                        marginBottom: 16,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={this.SignIn.bind(this)}>
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navToSignUp.bind(this)}>
                    <Text
                        style={{
                            color: 'black',
                        }}
                    >
                        Create new account
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
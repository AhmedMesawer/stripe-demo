import React, { Component } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity } from 'react-native';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    signUp() {
        if (this.state.email !== '' && this.state.password !== '') {
            var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
            var poolData = {
                UserPoolId : 'us-east-1_zmyxcklLE',
                ClientId : '4ssimhn5pqkjcga5u59ffgi20s'
            };
            var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
            var attributeList = [];

            var dataEmail = {
                Name: 'email',
                Value: this.state.email
            };

            var dataPhoneNumber = {
                Name: 'phone_number',
                Value: '+15555555555'
            };
            var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
            var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

            attributeList.push(attributeEmail);
            attributeList.push(attributePhoneNumber);

            userPool.signUp(this.state.email, this.state.password, attributeList, null, function (err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                var cognitoUser = result.user;
                console.log('user name is ' + cognitoUser.getUsername());
            });
        } else {
            alert('Enter email and password');
        }
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
                        marginBottom: 8,
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
                    onPress={this.signUp.bind(this)}>
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
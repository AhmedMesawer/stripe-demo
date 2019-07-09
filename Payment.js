import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import stripe from 'tipsi-stripe';

stripe.setOptions({
    publishableKey: 'pk_test_7hBQhj5avlLbl0Kg8iJYfg6z00u3Fo1m37',
});

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenId: ''
        };
    }

    requestPayment = () => {
        return stripe
            .paymentRequestWithCardForm()
            .then(stripeTokenInfo => {
                console.log('Token created', { stripeTokenInfo });
                this.setState({ tokenId: stripeTokenInfo.tokenId })
            })
            .catch(error => {
                console.log('Payment failed', { error });
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Make a payment"
                    onPress={this.requestPayment}
                />
                <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 16 }}>
                    TokenId: {this.state.tokenId}
                </Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
};
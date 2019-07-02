import React, { Component } from 'react';
import { View, Button } from 'react-native';
import stripe from 'tipsi-stripe';

stripe.setOptions({
    publishableKey: 'pk_test_7hBQhj5avlLbl0Kg8iJYfg6z00u3Fo1m37',
});

export default class Payment extends Component {

    constructor(props) {
        super(props);
    }

    requestPayment = () => {
        return stripe
            .paymentRequestWithCardForm()
            .then(stripeTokenInfo => {
                console.log('Token created', { stripeTokenInfo });
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
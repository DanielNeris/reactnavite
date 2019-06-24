import React, { Component } from 'react';
import api from '../services/api';

import { View, Text } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt"
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        try {
            const response = await api.get('/products');
        
            const { docs } = response.data;

            console.log(docs);
        } catch (error) {
            return error;
        }
    }

    render() {
        return (
            <View>
                <Text>Página Main</Text>
            </View>
        );
    }
}
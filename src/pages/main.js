import React, { Component } from 'react';
import api from '../services/api';

import { View, Text } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt"
    };

    constructor() {
        super();

        this.state = {
            docs: [],
        };
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        try {
            const response = await api.get('/products');
        
            const { docs } = response.data;

            this.setState({
                docs
            });
        } catch (error) {
            return error;
        }
    }

    render() {
        const { docs } = this.state;

        return (
            <View>
                <Text>Página Main: </Text>
                {docs.map(product => (
                    <Text key={product._id}>{product.title}</Text>
                ))}
            </View>
        );
    }
}
import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

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

    renderItem = ({ item }) => (
        <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity onPress={() => {}}>
                <Text>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        const { docs } = this.state;

        return (
            <View>
                <FlatList 
                    data={docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                ></FlatList>
            </View>
        );
    }
}
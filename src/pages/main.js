import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt"
    };

    constructor() {
        super();

        this.state = {
            productInfo: {},
            docs: [],
            page: 1,
        };
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        try {
            const response = await api.get(`/products?page=${page}`);
        
            const { docs, ...productInfo } = response.data;

            this.setState({
                docs: [...this.state.docs, ...docs], 
                productInfo,
                page
            });
        } catch (error) {
            return error;
        }
    }

    loadMore = () => {
        try {
            const { page, productInfo } = this.state;

            if (page === productInfo.pages) return;
    
            const pageNumber = page + 1;
    
            this.loadProducts(pageNumber);
        } catch (error) {
            return error;
        }
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity 
                style={styles.producButton} 
                onPress={() => {
                    this.props.navigation.navigate('Product', { product: item });
                }}
            >
                <Text style={styles.producButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        const { docs } = this.state;

        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list} 
                    data={docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },

    list: {
        padding: 20,
    },

    productContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },

    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },

    producButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#da552f',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    producButtonText: {
        fontSize: 16,
        color: '#da552f',
        fontWeight: 'bold',
    },
});
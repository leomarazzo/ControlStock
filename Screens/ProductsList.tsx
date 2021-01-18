import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../App';
import ActionButton from '../Common/ActionButton';
import { ProductsContext } from '../stores/ProductStore';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProductsList: React.FC<Props> = ({navigation}) => {

    const {sortedProducts, setCurrentProduct, loadProducts} = useContext(ProductsContext)

    const newProduct = () => {
        //TODO send to product form
    }

    const editProduct = (id: number) => {
        setCurrentProduct(id)
        //TODO send to product form
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    sortedProducts.map((p, i) => (
                        <ListItem
                            key={p.id}
                            onPress={() => editProduct(p.id)}
                        >
                            <ListItem.Title>{p.name}</ListItem.Title>
                            <ListItem.Subtitle>{`En stock: ${p.stock}`}</ListItem.Subtitle>
                        </ListItem>
                    ))
                }
            </ScrollView>
            <ActionButton onpress={() => newProduct()}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: "white",
    },
  });

export default ProductsList

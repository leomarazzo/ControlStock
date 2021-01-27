import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import ActionButton from "../Common/ActionButton";
import { IProduct } from "../Models/Product";
import { ProductsContext } from "../stores/ProductStore";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProductsList: React.FC<Props> = ({ navigation }) => {
  const isFocused = useIsFocused()
  const {
    sortedProducts,
    setCurrentProduct,
    loadProducts,
    unsetCurrentProduct,
  } = useContext(ProductsContext);
  const [products, setProducts] = useState([] as IProduct[])
  const [search, setSearch] = useState('')

  const newProduct = () => {
    navigation.navigate("Details");
  };

  const editProduct = (id: number) => {
    setCurrentProduct(id);
    navigation.navigate("Details");
  };

  useEffect(() => {
    if (isFocused){
      loadProducts();
      unsetCurrentProduct();
      setProducts(sortedProducts)
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Busqueda"
        onChangeText={setSearch}
        value={search}
        onClear={() => setSearch('')}
        style={{backgroundColor:'white'}}
        containerStyle={{height:55}}
        inputContainerStyle={{backgroundColor:'white', height:40}}
      />
      <ScrollView>
        {products.filter(p => p.name.includes(search)).map((p, i) => (
          <ListItem key={p.id} onPress={() => editProduct(p.id)}>
            <ListItem.Title>{p.name}</ListItem.Title>
            <ListItem.Subtitle>{`En stock: ${p.stock}`}</ListItem.Subtitle>
          </ListItem>
        ))}
      </ScrollView>
      <ActionButton onpress={() => newProduct()} />
    </View>
  );
};

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

export default observer(ProductsList);

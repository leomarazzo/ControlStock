import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { BottomSheet, Icon, ListItem, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import ActionButton from "../Common/ActionButton";
import { IProduct } from "../Models/Product";
import { ProductsContext } from "../stores/ProductStore";
import { saveFile } from "../Utils/Export";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProductsList: React.FC<Props> = ({ navigation }) => {
  const [stockFilter, setStockFilter] = useState(false);
  const isFocused = useIsFocused();
  const {
    sortedProducts,
    setCurrentProduct,
    loadProducts,
    unsetCurrentProduct,
  } = useContext(ProductsContext);
  const [products, setProducts] = useState([] as IProduct[]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  const newProduct = () => {
    navigation.navigate("Details");
  };

  const editProduct = (id: number) => {
    setCurrentProduct(id);
    navigation.navigate("Details");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="material-community"
          name="dots-vertical"
          onPress={() => setVisible(true)}
        />
      ),
    });
    if (isFocused) {
      loadProducts();
      unsetCurrentProduct();
      setProducts(sortedProducts);
    }
  }, [isFocused]);


  const exportProducts = () => {
    saveFile(sortedProducts).then(() => console.log("Finished"))
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Busqueda"
        onChangeText={setSearch}
        value={search}
        onClear={() => setSearch("")}
        style={{ backgroundColor: "white" }}
        containerStyle={{
          height: 55,
          backgroundColor: "#000000"
        }}
        inputContainerStyle={{ backgroundColor: "white", height: 40 }}
      />
      <ScrollView style={{ backgroundColor: "#000000" }}>
        {products
          .filter((item) => {
            if (stockFilter) {
              if (item.stock <= item.stockMin) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          })
          .filter((p) => p.name.includes(search))
          .map((p, i) => (
            <ListItem
              key={p.id}
              onPress={() => editProduct(p.id)}
              containerStyle={[
                p.stock <= p.stockMin
                  ? {
                      backgroundColor: "#b51b0d",
                      borderTopColor: "#e6792b",
                      borderBottomColor: "#e6792b",
                      borderTopWidth: 0.5,
                      borderBottomWidth: 0.5,
                    }
                  : {
                      backgroundColor: "#2f3643",
                      borderTopColor: "#e6792b",
                      borderBottomColor: "#e6792b",
                      borderTopWidth: 0.5,
                      borderBottomWidth: 0.5,
                      
                    },
              ]}
            >
              <ListItem.Title
                style={[
                  p.stock <= p.stockMin
                    ? { color: "#f0ebeb" }
                    : { color: "#e6792b" },
                ]}
              >
                {p.name}
              </ListItem.Title>
              <ListItem.Subtitle
                style={[
                  p.stock <= p.stockMin
                    ? { color: "#f0ebeb" }
                    : { color: "#e6792b" },
                ]}
              >{`En stock: ${p.stock}`}</ListItem.Subtitle>
              <ListItem.Subtitle
                style={[
                  p.stock <= p.stockMin
                    ? { color: "#f0ebeb" }
                    : { color: "#e6792b" },
                ]}
              >{`Stock Minimo: ${p.stockMin}`}</ListItem.Subtitle>
            </ListItem>
            
          ))}
      </ScrollView>
      <ActionButton onpress={() => newProduct()} />
      <BottomSheet isVisible={visible} modalProps={{}}>
        <ListItem
          containerStyle={{
            backgroundColor: "#2f3643",
            borderTopColor: "#e6792b",
            borderTopWidth: 0.5,
          }}
        >
          <ListItem.Title style={{ color: "#e6792b" }} onPress={() => exportProducts()}>
            Exportar a CSV
          </ListItem.Title>
        </ListItem>
        <ListItem
          onPress={() => setStockFilter(!stockFilter)}
          containerStyle={{
            backgroundColor: "#2f3643",
            borderTopColor: "#e6792b",
            borderTopWidth: 0.5,
          }}
        >
          {stockFilter ? (
            <ListItem.Title style={{ color: "#e6792b" }}>
              Remover Filtro
            </ListItem.Title>
          ) : (
            <ListItem.Title style={{ color: "#e6792b" }}>
              Filtrar por Stock Minimo
            </ListItem.Title>
          )}
        </ListItem>
        <ListItem
          onPress={() => setVisible(false)}
          containerStyle={{ backgroundColor: "#b51b0d" }}
        >
          <ListItem.Title>Cerrar</ListItem.Title>
        </ListItem>
      </BottomSheet>
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

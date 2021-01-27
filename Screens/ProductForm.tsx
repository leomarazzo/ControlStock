import { StackNavigationProp } from "@react-navigation/stack";
import { values } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import NumberInput from "../Common/NumberInput";
import { ProductsContext } from "../stores/ProductStore";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProductForm: React.FC<Props> = ({ navigation }) => {
  const {
    currentProduct,
    getNextID,
    addProduct,
    deleteCurrentProduct,
    updateProduct,
  } = useContext(ProductsContext);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [stockMin, setStockMin] = useState(0);

  useEffect(() => {
    if (currentProduct !== null) {
      setId(currentProduct.id);
      setName(currentProduct.name);
      setStock(currentProduct.stock);
      setStockMin(currentProduct.stockMin);
    } else {
      setId(getNextID());
    }
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Guardar"
          type="clear"
          containerStyle={{ marginRight: 20, width: 100 }}
          onPress={() => saveProduct()}
        />
      ),
    });
  });

  const saveProduct = () => {
    if (currentProduct === null) {
      newProduct();
    } else {
      editProduct();
    }
  };

  const newProduct = () => {
    addProduct({
      id: id,
      name: name,
      stock: stock,
      stockMin: stockMin,
    });
    navigation.navigate("Home")
  };

  const editProduct = () => {
    updateProduct({
      id: id,
      name: name,
      stock: stock,
      stockMin: stockMin,
    });
    navigation.navigate("Home")
  };

  const deleteProduct = () => {
    deleteCurrentProduct()
    navigation.navigate("Home")
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <Input
            label={<Text style={{ fontSize: 20 }}>Id</Text>}
            disabled={true}
            defaultValue={id.toString()}
            style={styles.item}
          />
          <Input
            label={<Text style={{ fontSize: 20 }}>Nombre</Text>}
            defaultValue={name}
            style={styles.item}
            onChangeText={(value) => setName(value)}
          />
          <View style={styles.item}>
            <NumberInput value={stock} onChange={setStock} minValue={0} />
          </View>
          <View style={styles.item}>
            <NumberInput value={stockMin} onChange={setStockMin} minValue={0} />
          </View>
          {!!currentProduct && (
            <Button
              type="outline"
              title="Borrar producto"
              buttonStyle={{ borderColor: "red" }}
              titleStyle={{ color: "red" }}
              onPress={() => deleteProduct()}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingHorizontal: 50,
  },
  item: {
    padding: 10,
    marginTop: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default observer(ProductForm);

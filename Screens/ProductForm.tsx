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

  const [id, setid] = useState(getNextID());
  const [name, setname] = useState("");
  const [stock, setstock] = useState(0);
  const [stockMin, setstockMin] = useState(0);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Guardar"
          type="clear"
          containerStyle={{ marginRight: 20, width: 100 }}
          onPress={() => saveProduct()}
        />
      ),
    })
    if (currentProduct !== null && !loaded) {
      setid(currentProduct.id);
      setname(currentProduct.name);
      setstock(currentProduct.stock);
      setstockMin(currentProduct.stockMin);
      setLoaded(true)
    };
  });

  const saveProduct = () => {
    if (currentProduct === null) {
      addProduct({
        id: id,
        name: name,
        stock: stock,
        stockMin: stockMin,
      });
    } else {
      updateProduct({
        id: id,
        name: name,
        stock: stock,
        stockMin: stockMin,
      });
    }
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
            label={<Text style={{ fontSize: 25, color:"#e6792b" }}>Id</Text>}
            disabled={true}
            defaultValue={id.toString()}
            style={styles.item}
          />
          <Input
            label={<Text style={{ fontSize: 25, color:"#e6792b" }}>Nombre</Text>}
            defaultValue={name}
            style={styles.item}
            onChangeText={(value) => setname(value)}
          />
          <View style={styles.item}>
            <NumberInput value={stock} onChange={setstock} minValue={0} />
          </View>
          <View style={styles.item}>
            <NumberInput value={stockMin} onChange={setstockMin} minValue={0} />
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
    backgroundColor: "#2f3643"
  },
  item: {
    padding: 10,
    marginTop: 20,
    color: '#e6792b',
    fontSize:25
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default ProductForm;

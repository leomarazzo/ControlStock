import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon, Input } from "react-native-elements";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { min } from 'react-native-reanimated';

interface IProps {
    value: number;
    onChange: (value: number) => void;
    minValue?: number,
    maxValue?: number,
}

const NumberInput: React.FC<IProps> = ({value, onChange, minValue, maxValue}) => {
    const subs = () => {
        value--
        onChange(value)
        
    }

    const add = () => {
        value++
        onChange(value)
    }

    const inp = (val: any) => {
        try {
            value = parseInt(val)
            onChange(value)
        } catch (error) {
            value= 0
        }
    }

    const endInp = () => {
        if (Number.isNaN(value)){
            value=0
            onChange(value)
        }
    }

    return (
        <View style={styles.container}>
            <Icon reverse raised name="remove" disabled={(value === minValue)} size={30} type="material" onPress={() => subs()} style={styles.icon}/>
            <Input defaultValue={value.toString()} onChange={(val) => inp(val)} style={styles.input} onEndEditing={() => endInp()}/>
            <Icon reverse raised name="add" size={30} disabled={(value === maxValue)} type="material" onPress={() => add()} style={styles.icon}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '25%',
        marginLeft: '10%'
        
    },
    icon: {
        flex: 10,
    },
    input: {
        flex: 1,
    }
})

export default NumberInput

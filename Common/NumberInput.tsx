import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon, Input } from "react-native-elements";

interface IProps {
    value: number;
    onChange: (value: number) => void;
    minValue?: number,
    maxValue?: number,
}

const NumberInput: React.FC<IProps> = ({value, onChange, minValue, maxValue}) => {

    const [number, setnumber] = useState(0)

    useEffect(() => {
        setnumber(value)
    }, [])

    const subs = () => {
        
        setnumber(number - 1)
        onChange(number)
    }

    const add = () => {
        setnumber(number + 1)
        onChange(number)
    }

    const inp = (val: any) => {
        setnumber(parseInt(val))
    }

    const endInp = () => {
        onChange(number) 
    }

    return (
        <View style={styles.container}>
            <Icon reverse raised name="remove" disabled={(value === minValue)} size={30} type="material" onPress={() => subs()} reverseColor='#e6792b'/>
            <Input defaultValue={value.toString()} onChangeText={(val) => inp(val)} style={styles.input} onBlur={() => endInp()} onEndEditing={() => endInp()}/>
            <Icon reverse raised name="add" size={30} disabled={(value === maxValue)} type="material" onPress={() => add()} reverseColor='#e6792b'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '25%',
        marginLeft: '10%'
        
    },
    input: {
        flex: 1,
        color: '#e6792b'
    }
})

export default NumberInput

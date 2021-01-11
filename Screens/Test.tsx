import React from 'react'
import { Button } from 'react-native'
import { View, Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Test: React.FC<Props> = ({navigation}) => {
    return (
        <View>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Button
                title="Go to profile"
                onPress={() =>
                    navigation.navigate('Profile')
                }
                />
        </View>
    )
}

export default Test

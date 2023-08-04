import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import colors from "../colors";
import { Alert, FlatList } from "react-native";
import { RealmContext, useRealm } from "../context";

// const emotions = [
//     <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="black" />,
    // <MaterialCommunityIcons name="emoticon-angry-outline" size={24} color="black" />,
    // <MaterialCommunityIcons name="emoticon-cry-outline" size={24} color="black" />,

    // <MaterialCommunityIcons name="emoticon-cool-outline" size={24} color="black" />,
    // <MaterialCommunityIcons name="emoticon-dead-outline" size={24} color="black" />,

    // <MaterialCommunityIcons name="emoticon-kiss-outline" size={24} color="black" />,
    // <MaterialCommunityIcons name="emoticon-neutral-outline" size={24} color="black" />,
    // <MaterialCommunityIcons name="emoticon-tongue-outline" size={24} color="black" />,
// ]; 

// const emotions = ["🤯", "🥲", "🤬", "🤗", "🥰", "😊", "🤩"];

const emotions = [
    {
        emoji:  <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="black" />,
        emojiName: "emoticon-happy-outline"
    }, 
    {
        emoji: <MaterialCommunityIcons name="emoticon-angry-outline" size={24} color="black" />,
        emojiName: "emoticon-angry-outline", 
    }, 
    {
        emoji: <MaterialCommunityIcons name="emoticon-cry-outline" size={24} color="black" />, 
        emojiName: "emoticon-cry-outline", 
    }, 
    {
        emoji: <MaterialCommunityIcons name="emoticon-cool-outline" size={24} color="black" />, 
        emojiName: "emoticon-cool-outline", 
    }, 
    {
        emoji: <MaterialCommunityIcons name="emoticon-dead-outline" size={24} color="black" />,
        emojiName: "emoticon-dead-outline", 
    }, 
    {
        emoji: <MaterialCommunityIcons name="emoticon-kiss-outline" size={24} color="black" />, 
        emojiName: "emoticon-kiss-outline", 
    }, 
    {
        emoji: <MaterialCommunityIcons name="emoticon-neutral-outline" size={24} color="black" />,
        emojiName: "emoticon-neutral-outline", 
    }, 
    {
        emoji: <MaterialCommunityIcons name="emoticon-tongue-outline" size={24} color="black" />,
        emojiName: "emoticon-tongue-outline", 
    }, 
];

const Write = ({navigation: { goBack }}) => {
    const realm = useRealm();
    const [selectEmotion, setSelectEmotion] = useState(null);
    const [feelings, setFeelings] = useState(""); 
    
    const onChangeText = (text) => setFeelings(text); 
    const onEmotionPress = (face) => {
        setSelectEmotion(face.emojiName);
    };

    const onSubmit = () => {
        if(feelings === "" || selectEmotion === null) {
            return Alert.alert("Please complete form."); 
        }
        realm.write(() => {
            const feeling = realm.create("Feeling", {
                _id: Date.now(), 
                emotion: selectEmotion, 
                message: feelings, 
            });
            console.log(feeling);
        });
        goBack();
    };

    return (
        <Container>
            <Title> How do you feel today? </Title>
            <Emotions>
                <FlatList horizontal
                    data={emotions}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={VerticalMidiaSeparator}
                    contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 10}}
                    renderItem={({item}) => (
                        <Emotion 
                            onPress={() => onEmotionPress(item)}
                            selected={item.emojiName === selectEmotion}>
                            <EmotionText> {item.emoji} </EmotionText>
                        </Emotion>
                    )}
                />
            </Emotions>
            <TextInput 
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                value={feelings}
                onChangeText={onChangeText}
                placeholder="Write your feelings..."
                placeholderTextColor="#8C8C8C" />
            <Button onPress={onSubmit}>
                <ButtonText> Save </ButtonText>
            </Button>
        </Container>
    )
};

const Container = styled.View`
    background-color: ${colors.bgColor};
    flex: 1;
    padding: 0px 30px;
`;

const Title = styled.Text`
    color: ${colors.textColor};
    margin: 50px 0px;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
`;

const TextInput = styled.TextInput`
    background-color: white;
    border-radius: 20px;
    padding: 15px 30px;
    font-size: 18px;
    box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Button = styled.TouchableOpacity`
    background-color: ${colors.btnColor};
    width: 100%;
    margin-top: 20px;
    padding: 10px 20px;
    align-items: center;
    border-radius: 20px;
    box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`;

const Emotions = styled.View`
    background-color: rgba(140, 140, 140, 0.1);
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    border-radius: 10px;
`;

const Emotion = styled.TouchableOpacity`
    background-color: white;
    box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${(props) =>
        props.selected ? "rgba(41, 30, 95, 0.7);" : "transparent"};
`;

const EmotionText = styled.Text`
    font-size: 24px;
`;

const VerticalMidiaSeparator = styled.View`
    width: 20px;
`;

export default Write; 
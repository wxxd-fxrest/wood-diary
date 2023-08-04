import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Ionicons } from "@expo/vector-icons"
import colors from "../colors";
import { useRealm } from "../context";
import { Alert, FlatList, LayoutAnimation } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

const Home = ({navigation: {navigate}}) => {
    const realm = useRealm();
    const [feelings, setfeelings] = useState([]);

    useEffect(() => {
        const feelings = realm.objects("Feeling");
        feelings.addListener((feelings, change) => {
            LayoutAnimation.spring();
            setfeelings(feelings.sorted("_id", false));
        });
        
        return () => {
            feelings.removeAllListeners();
        };
    }, []);

    const onDelete = (id) => {
            Alert.alert(
                '삭제',
                '정말로 삭제하시겠습니까?',
                [
                    {
                        text: "No",
                        onPress: () => console.log("nono"),
                        style: "destructive"
                    },
                    {
                        text: "Yes",
                        onPress: () => {
                            realm.write(() => {
                                const feeling = realm.objectForPrimaryKey("Feeling", id);
                                realm.delete(feeling); 
                            })
                        }
                    },
                ],
                {
                    cancelable: true,
                },
            );
    };

    return (
        <Container>
            <Title> Home </Title>
            <FlatList 
                data={feelings}    
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={emptyBox}
                contentContainerStyle={{paddingVertical: 10}}
                keyExtractor={(feelings) => feelings._id + ""}
                renderItem={({item}) => (
                    <FeelingContainer>
                        <Emotion>
                            <MaterialCommunityIcons name={item.emotion} size={26} color="black" />
                        </Emotion>
                        <FeelingText> {item.message} </FeelingText>
                        <DeleteIcon onPress={() => onDelete(item._id)}>
                            <Feather name="x-circle" size={24} color="black" />
                        </DeleteIcon>
                    </FeelingContainer>
                )}
            />
            <Button onPress={() => navigate("Write")}>
                <Ionicons name="add" size={36} color="white" />
            </Button>
        </Container>
    )
};

const Container = styled.View`
    background-color: ${colors.bgColor};
    flex: 1;
    padding: 0px 50px;
    padding-top: 100px;
`;

const Title = styled.Text`
    color: ${colors.textColor};
    font-size: 38px;
    margin-bottom: 30px;
`;

const Button = styled.TouchableOpacity`
    background-color: ${colors.btnColor};
    position: absolute;
    bottom: 40px;
    right: 30px;
    height: 80px;
    width: 80px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

const FeelingContainer = styled.View`
    flex-direction: row;
    background-color: ${colors.cardColor};
    padding: 15px 15px;
    border-radius: 10px;
    align-items: flex-start;
`;

const Emotion = styled.Text`
    margin-right: 10px;
 `;

const FeelingText = styled.Text`
    font-size: 18px;
    width: 80%;
`;

const DeleteIcon = styled.TouchableOpacity``;

const emptyBox = styled.View`
    height: 10px;
`;

export default Home; 
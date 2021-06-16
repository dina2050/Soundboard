import {Button, Text, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {removeSample} from "../library/librarySlice";

const LibraryItem = ({ name, type, url, crop, id }) => {
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(removeSample(id));
    }
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
            }}
        >
            <Text>
                {name}
            </Text>
            <Text> type: {type}</Text>
            <Button title="X" onPress={remove} />
        </View>
    );
};

export default LibraryItem;

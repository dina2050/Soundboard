import {Button, Text, View} from "react-native";
import React from "react";

const PadItem = ({ id, sampleId, url, name }) => {

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
            }}
        >
            <Text>
                {id}
            </Text>
        </View>
    );
};

export default PadItem;

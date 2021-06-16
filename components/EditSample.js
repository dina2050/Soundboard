import React, {useState} from "react";
import {Button, Text, TextInput, View, TouchableOpacity, Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addSample, editSample, librarySelector} from "../library/librarySlice";

const EditSample = (id) => {
    const library = useSelector(librarySelector);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [url, setUrl] = useState("");
    const [crop, setCrop] = useState("");
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(editSample(id));
        setName("");
        setType("");
        setUrl("");
        setCrop("");
        console.log(library)
    };
    return (
        <View>
            <TextInput
                type='text'
                name='name'
                value={name}
                onChangeText={setName}
            />
            <TextInput
                type='text'
                name='type'
                value={type}
                onChangeText={setType}
            />
            <TextInput
                type='text'
                name='url'
                value={url}
                onChangeText={setUrl}
            />

            <Button title="Edit a sample" type="submit"  value="Submit" onPress={handlePress}>
                Edit a sample
            </Button>
        </View>

    );

}

export default EditSample;

import React, {useState} from "react";
import {Button, Text, TextInput, View, TouchableOpacity, Image, FlatList, Picker} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addSample, librarySelector} from "../library/librarySlice";
import PadItem from "./PadItem";
import LibraryItem from "./LibraryItem";
import {changeSource} from "../pad/padSlice";

const LibraryView = ({ route }) => {
    const library = useSelector(librarySelector);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [url, setUrl] = useState("");
    const [crop, setCrop] = useState("");
    const [sampleId, setSampleId] = useState("");
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(addSample({name, url, type}));
        setName("");
        setType("");
        setUrl("");
        console.log(library)
    };

    const changeTheId = (id) => {
        if(route.params.id){
            dispatch(changeSource({id:route.params.id, sampleId:id}));
        }
    };
            return (
                <View style={{marginTop:20}}>
                <View>
                    <Text style={{textAlign:'center', fontSize:40}}>Add a new sample</Text>
                        <TextInput
                            type='text'
                            name='name'
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter sample name"
                        />
                    <Picker
                        selectedValue={type}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                    >
                        <Picker.Item label="default" value="default" />
                        <Picker.Item label="freesound" value="freesound" />
                    </Picker>
                        <TextInput
                            type='text'
                            name='url'
                            value={url}
                            onChangeText={setUrl}
                            placeholder="Enter sample url"
                        />
                        <Button title="Add" type="submit"  value="Submit" onPress={handlePress} >
                            Add
                        </Button>
                    </View>

                    <View style={{
                        marginTop: 50
                    }}>
                        <FlatList
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => changeTheId(item.id)}
                                >
                                    <LibraryItem {...item} />
                                </TouchableOpacity>}
                            keyExtractor={(item) => item.id.toString()}
                            data={library}
                        />
                    </View>
                    </View>
            );

}

export default LibraryView;

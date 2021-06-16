import React, {useEffect, useState} from "react";
import {Button, FlatList, Text, TouchableOpacity, View} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import {padSelector} from "../pad/padSlice";
import {librarySelector} from "../library/librarySlice";
import { remove } from "../library/librarySlice";
import PadItem from "./PadItem";
import PadItemView from "./PadItemView";
import {Audio} from "expo-av";

const PadItems = (props) => {
    const pad = useSelector(padSelector);
    const library = useSelector(librarySelector);
    const dispatch = useDispatch();
    let music;
    /*  library.map((sound) => {
         console.log(sound)
      })*/

    async function loadAudio(url) {
        music  = new Audio.Sound()
        try {
            await music.loadAsync({uri:url})
        } catch (e) {
            console.log('ERROR Loading Audio', e);
        }
        await music.playAsync()
    }
console.log(pad)

    return (
            <View style={{
                marginTop: 50
            }}>
                <FlatList
                    numColumns={3}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            key={index}
                            onPress={() => loadAudio(item.url)}
                            onLongPress={() => {
                                props.navigation.navigate('PadItemView', item)
                            }}>
                        <PadItem {...item} />
                        </TouchableOpacity>}
                    keyExtractor={(item) => item.id.toString()}
                    data={pad}
                />
        </View>
    )

};
export default PadItems;
connect(state => ({ library: state.library }))(PadItems);


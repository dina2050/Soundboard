import React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PadItem from "./PadItems";
import {editSample, librarySelector} from "../library/librarySlice";
import { removeSample } from "../library/librarySlice";
import PadItems from "./PadItems";
import LibraryView from "./LibraryView";
import EditSample from "./EditSample";
import RecordAudio from "./RecordAudio";
import SearchFreesound from "./SearchFreesound";

const PadItemView = ({ route, navigation }) => {
    const library = useSelector(librarySelector);
    const dispatch = useDispatch();
console.log("paditemview", route.params)
    return (
        <View style={{marginTop:50}}>

        <TouchableOpacity
            onPress={() => {
                navigation.navigate('LibraryView', route.params)
            }}
        >
            <Text style={{color:"blue", fontSize:20}}>Choose from local library</Text>

        </TouchableOpacity>

            <Text style={{textAlign:'center', fontSize:40}}>Record a new sample</Text>
            <RecordAudio propFromPadItemView={route.params} />
            <SearchFreesound dataFromPadItemView={route.params}/>
    </View>
    )

}


export default PadItemView





/*<View>
        {library.map((sound) => {

                if(sound.id === route.params.sampleId){
                    return (<View key={sound.id.toString()}>
                        <Text>{sound.name} </Text>
                    </View>)
                }})}
        </View>*/

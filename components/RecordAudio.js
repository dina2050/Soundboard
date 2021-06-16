import * as React from 'react';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native';
import { Audio } from 'expo-av';
import {addSample, librarySelector} from "../library/librarySlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeSource} from "../pad/padSlice";

const RecordAudio = ({propFromPadItemView}) => {
    const library = useSelector(librarySelector);
    const [recording, setRecording] = React.useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [type, setType] = useState("recorded");
    const dispatch = useDispatch();
    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setUrl(uri);
    }

    const handlePress = () => {
        dispatch(addSample({url, name, description, type}));
    }

    useEffect(() => {
        library.map(sound => {
            if(url && name && sound.name === name){
                dispatch(changeSource({id:propFromPadItemView.id, sampleId:sound.id}));
            }
        })
    })
 /*   const addToTheCurrentPad = () => {
        library.map(sound => {
            if(sound.name === name){
                dispatch(changeSource({id:propFromPadItemView.id, sampleId:sound.id}));
            }
        })
    }*/
    return (
        <View style={{marginTop:20}}>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            <TextInput
                type='text'
                name='name'
                value={name}
                onChangeText={setName}
                placeholder="Enter a title for recorded sound"
            />
            <TextInput
                type='text'
                name='type'
                value={description}
                onChangeText={setDescription}
                placeholder="Enter a description for recorded sound"
            />
            <Button title="submit" type="submit"  value="Submit" onPress={handlePress}>
                Add to the Library
            </Button>
        </View>
    );
}

export default RecordAudio;

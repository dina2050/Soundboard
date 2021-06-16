import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import * as FileSystem from "expo-file-system";
import {addSample, librarySelector} from "../library/librarySlice";
import {useDispatch, useSelector} from "react-redux";
import {changeSource} from "../pad/padSlice";

const FreesoundItem = (props) => {
    const dispatch = useDispatch();
    const [type, setType] = useState("freesound");
    const [url, setUrl] = useState('');
    const [name, setSoundName] = useState('');
    const library = useSelector(librarySelector);
      const downloadFile = async (downloadUrl, name) => {
        const fileUri = FileSystem.documentDirectory + name +".mp3";
        let downloadObject = FileSystem.createDownloadResumable(
            downloadUrl,
            fileUri
        );
        let downloaded = await downloadObject.downloadAsync();
        console.log("downloaded", downloaded)
        console.log("url", url)
        dispatch(addSample({url:downloaded.uri, name, type}));
        setUrl(downloaded.uri);
        setSoundName(name)
    }
const getPreview = (id) =>{
    const url="https://freesound.org/apiv2/sounds/" + id + "/"
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             'Authorization': 'Token VCc2Ke0QciWwQQnKWDX4sFqBdd22OQp70JnuhQd5'}})
        .then((response) =>response.json())
        .then((data) => {
            downloadFile(data.previews['preview-hq-mp3'], data.name).then(r => console.log(r))
        })

}
    useEffect(() => {
        library.map(sound => {
            if(url && name && sound.name === name){
                dispatch(changeSource({id:props.data.id, sampleId:sound.id}));
            }
        })
    })

    return(
        <View>
            {Object.keys(props.results).map((sound,index) => {
                return (
                    <View key={index}>
                            <TouchableOpacity
                                key={index}
                                onPress={() => getPreview(props.results[sound].id.toString())}
                            >
                            <Text>{props.results[sound].name}</Text>
                            </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )
}

export default FreesoundItem;

import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import FreesoundItem from "./FreesoundItem";

const SearchFreesound = ({dataFromPadItemView}) => {

    const [search, updateSearch]=useState('')
    const [searchResults, setSearchResults] = useState([]);

    const url = "https://freesound.org/apiv2/search/text/?query="+ search +"&token=VCc2Ke0QciWwQQnKWDX4sFqBdd22OQp70JnuhQd5"
    const emptyArr=[]
    function fetchData(){
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    emptyArr.push(data)
                    setSearchResults(emptyArr)
                })

    }

    useEffect( () => {
        fetchData()
    },[search])




    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData()
    }


    return (

        <View style={{marginTop:20}}>
            <Text >Movies</Text>
            <View>
                    <TextInput
                        style={{marginRight:15}}
                        type='search'
                        name='search'
                        value={search}
                        onChangeText={(event) => updateSearch(event)}
                        placeholder='title'
                    />
                <Button title="search" type="submit"  value="Submit" onPress={handleSubmit}>
                    Search
                </Button>
            </View>
            <FlatList
                renderItem={(obj) =>
                    <FreesoundItem key={obj.item.key} {...obj.item} data={dataFromPadItemView}/>
                }
                data = {searchResults}

            />

        </View>
    );
}

export default SearchFreesound;

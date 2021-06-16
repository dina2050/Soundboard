import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
import padReducer from "../pad/padSlice";
import libraryReducer from "../library/librarySlice"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const reducers = combineReducers({  pad: padReducer,
    library: libraryReducer });

const persistedReducer = persistReducer(
    { key: "root", storage: AsyncStorage },
    reducers
);

export default configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

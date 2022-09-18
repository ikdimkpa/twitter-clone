import { createContext, useReducer } from "react";

const initialiState = {
    isDelete: false,
    showReply: false,
    posts: null,
    post: null,
    comments: null,
    liked: false,
    name: "Hi",
    bio: "",
    location: "",
    website: "",
    birthDate: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_IS_DELETE':
            return {
                ...state, isDelete: action.payload
            };

        case 'SHOW_REPLY':
            return {
                ...state, showReply: action.payload
            };
        case 'POSTS':
            return {
                ...state, posts: action.payload
            };
        case 'SET_POST':
            return {
                ...state, post: action.payload
            };
        case 'SET_COMMENTS':
            return {
                ...state, comments: action.payload
            };
        case 'LIKED':
            return {
                ...state, liked: action.payload
            };
        case 'EDIT_PROFILE':
            return {
                ...state,
                name: action.payload.name,
                bio: action.payload.bio,
                location: action.payload.location,
                website: action.payload.website,
                birthDate: action.payload.birthDate
            };
        default:
            return state;
    }
};

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialiState);

    return (
        <AppContext.Provider value={{ state, dispatch, reducer }}>
            {children}
        </AppContext.Provider>
    );

};

export default AppProvider;
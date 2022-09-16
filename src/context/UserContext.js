import { createContext, useReducer } from "react";

const user = {
    username: localStorage.getItem('username'),
    displayName: localStorage.getItem('displayName'),
    photoURL: localStorage.getItem('photoURL')
};

const initialiState = {
    isDelete: false,
    showReply: false,
    posts: null,
    post: null,
    comments: null,
    liked: false
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
            }
        default:
            return state;
    }
};

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialiState);

    return <UserContext.Provider value={{ user, state, dispatch, reducer }}>
        {children}
    </UserContext.Provider>
};

export default UserProvider;
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState:{
        isUser:localStorage.getItem('user-info')
        ? true
        : false,
        userInfo:localStorage.getItem('user-info')
        ? JSON.parse(localStorage.getItem('user-info'))
        : null,
        blogTitle:"",
        blogData:{},
        blogTags:[]
    },
    reducers:{
        setisUser(state,action){
            state.isUser = action.payload;
            if(action.payload===false){
                localStorage.removeItem("user-info")
                console.log("bye")
                window.location.href = "/";
            }
        },
        setuserInfo(state,action){
            state.userInfo = action.payload;
        },
        setBlogTitle(state,action){
            state.blogTitle = action.payload;
            localStorage.setItem("blog-title",JSON.stringify(action.payload))
        },
        setblogData(state,action){
            state.blogData = action.payload;
            localStorage.setItem("blog-data",JSON.stringify(action.payload))
        },
        setBlogTags(state,action){
            state.blogTags = action.payload;
            localStorage.setItem("blog-tags",JSON.stringify(action.payload))
        }

    }
})

export const UserReducer = userSlice.reducer;
export const {setisUser, setuserInfo, 
    setblogData,setBlogTitle,setBlogTags} = userSlice.actions;
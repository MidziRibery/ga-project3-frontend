import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: {
    _id: "6395e4e83165efc500b1bb31",
    title:
      "🔴 Relaxing Music 24/7, Sleep Music, Stress Relief Music, Spa, Meditation, Yoga, Zen, Sleeping Music",
    description:
      "Get the new Yellow Brick Cinema iOS app for a 7-day FREE trial: https://apple.co/30uHqHe Relaxing Music 24/7, Sleep Music, ...",
    thumbnail: "https://i.ytimg.com/vi/KJPctZniNIw/mqdefault_live.jpg",
    youtubeId: "KJPctZniNIw",
    creator: "Yellow Brick Cinema - Relaxing Music",
  },
  //   currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = videoSlice.actions;

export default videoSlice.reducer;

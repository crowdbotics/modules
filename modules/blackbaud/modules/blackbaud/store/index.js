import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { Alert } from "react-native";

export const eventList = createAsyncThunk(
  "events/eventList",
  async (accessToken) => {
    try {
      const response = await api.getEventListing(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const eventDetails = createAsyncThunk(
  "events/eventDetails",
  async (data) => {
    try {
      const response = await api.getEventDetails(data.token, data.id);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const attendeeList = createAsyncThunk(
  "events/attendeeList",
  async (data) => {
    try {
      const response = await api.getAttendeeList(data.token, data.id);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getAddressList = createAsyncThunk(
  "events/addressList",
  async (accessToken) => {
    try {
      const response = await api.getAddressList(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCodeList = createAsyncThunk(
  "constituent/list",
  async (accessToken) => {
    try {
      const response = await api.getConstituentCodeList(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCodeDetails = createAsyncThunk(
  "constituents/detail",
  async (data) => {
    try {
      const response = await api.getConstituentCodeDetails(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCodeListInConstituent = createAsyncThunk(
  "constituents/listInConstituent",
  async (data) => {
    try {
      const response = await api.getConstituentCodeListInConstituent(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCustomFieldCategories = createAsyncThunk(
  "constituents/customFieldCategories",
  async (data) => {
    try {
      const response = await api.getConstituentCustomFieldCategories(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCustomFieldCategoriesDetails = createAsyncThunk(
  "constituents/customFieldCategoriesDetails",
  async (data) => {
    try {
      const response = await api.getConstituentCustomFieldCategoriesDetails(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCustomFieldCategoriesValues = createAsyncThunk(
  "constituents/customFieldCategoriesValues",
  async (data) => {
    try {
      const response = await api.getConstituentCustomFieldCategoriesValues(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCustomFieldList = createAsyncThunk(
  "constituents/customFieldList",
  async (data) => {
    try {
      const response = await api.getConstituentCustomFieldList(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const constituentList = createAsyncThunk(
  "constituents/list",
  async (accessToken) => {
    try {
      const response = await api.getConstituentList(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const createConstituent = createAsyncThunk(
  "constituent/create",
  async (data) => {
    try {
      const response = await api.createConstituent(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const consentChannels = createAsyncThunk(
  "consent/channels",
  async (accessToken) => {
    try {
      const response = await api.getChannels(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const constituentAppealList = createAsyncThunk(
  "constituents/constituent_appeal_list/id",
  async (data) => {
    try {
      const response = await api.getConstituentAppealList(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const constituentAttachmentList = createAsyncThunk(
  "constituents/attachment_list/id",
  async (data) => {
    try {
      const response = await api.getConstituentAttachmentList(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const constituentDetailsById = createAsyncThunk(
  "constituents/constituents_details/id",
  async (data) => {
    try {
      const response = await api.getConstituentDetails(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const educationList = createAsyncThunk(
  "constituents/education_list",
  async (accessToken) => {
    try {
      const response = await api.getEducationList(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const currencyConfiguration = createAsyncThunk(
  "constituents/get_currencyconfiguration",
  async (accessToken) => {
    try {
      const response = await api.getCurrencyConfiguration(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const countriesList = createAsyncThunk(
  "constituents/countries",
  async (accessToken) => {
    try {
      const response = await api.getCurrencyConfiguration(accessToken);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

const initialState = {
  events: [],
  api: { loading: "idle", error: null },
  accessToken: "",
  eventDetailApi: { loading: "idle", error: null },
  attendeeListApi: { loading: "idle", error: null },
  eventDetails: false,
  attendeeList: [],
  addressList: [],
  addressListApi: { loading: "idle", error: null },
  constituentCodeList: [],
  constituentCodeListApi: { loading: "idle", error: null },
  constituentCodeDetail: {},
  constituentCodeDetailApi: { loading: "idle", error: null },
  constituentCodeListInConstituent: [],
  constituentCodeListInConstituentApi: { loading: "idle", error: null },
  constituentCustomFieldCategories: [],
  constituentCustomFieldCategoriesApi: { loading: "idle", error: null },
  constituentCustomFieldCategoriesDetails: [],
  constituentCustomFieldCategoriesDetailsApi: { loading: "idle", error: null },
  constituentCustomFieldCategoriesValues: [],
  constituentCustomFieldCategoriesValuesApi: { loading: "idle", error: null },
  constituentCustomFieldList: [],
  constituentCustomFieldListApi: { loading: "idle", error: null },
  constituentList: [],
  constituentListApi: { loading: "idle", error: null },
  createConstituentApi: { loading: "idle", error: null },
  consentChannelsData: [],
  consentChannelsApi: { loading: "idle", error: null },
  constituentAppealListData: [],
  constituentAppealListApi: { loading: "idle", error: null },
  constituentAttachmentListData: [],
  constituentAttachmentListApi: { loading: "idle", error: null },
  constituentDetailsData: [],
  constituentDetailsApi: { loading: "idle", error: null },
  educationListData: [],
  educationListApi: { loading: "idle", error: null },
  currencyConfigurationData: [],
  currencyConfigurationApi: { loading: "idle", error: null },
  countriesListData: [],
  countriesListApi: { loading: "idle", error: null }
};

export const slice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    saveAccessToken(state, action) {
      state.accessToken = action.payload;
    }
  },
  extraReducers: {
    [eventList.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [eventList.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.events = action.payload.value;
        state.api.loading = "idle";
      }
    },
    [eventList.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },
    [eventDetails.pending]: (state, action) => {
      if (state.eventDetailApi.loading === "idle") {
        state.eventDetailApi.loading = "pending";
        state.eventDetailApi.error = null;
      }
    },
    [eventDetails.fulfilled]: (state, action) => {
      if (state.eventDetailApi.loading === "pending") {
        state.eventDetails = action.payload;
        state.eventDetailApi.loading = "idle";
      }
    },
    [eventDetails.rejected]: (state, action) => {
      if (state.eventDetailApi.loading === "pending") {
        state.eventDetailApi.error = action.error;
        state.eventDetails = false;
        state.eventDetailApi.loading = "idle";
      }
    },
    [attendeeList.pending]: (state, action) => {
      if (state.attendeeListApi.loading === "idle") {
        state.attendeeListApi.loading = "pending";
        state.attendeeListApi.error = null;
      }
    },
    [attendeeList.fulfilled]: (state, action) => {
      if (state.attendeeListApi.loading === "pending") {
        state.attendeeList = action.payload.value;
        state.attendeeListApi.loading = "idle";
      }
    },
    [attendeeList.rejected]: (state, action) => {
      if (state.attendeeListApi.loading === "pending") {
        state.attendeeListApi.error = action.error;
        state.attendeeList = [];
        state.attendeeListApi.loading = "idle";
      }
    },
    [getAddressList.pending]: (state) => {
      if (state.addressListApi.loading === "idle") {
        state.addressListApi.loading = "pending";
        state.addressListApi.error = null;
      }
    },
    [getAddressList.fulfilled]: (state, action) => {
      if (state.addressListApi.loading === "pending") {
        state.addressList = action.payload.value;
        state.addressListApi.loading = "idle";
      }
    },
    [getAddressList.rejected]: (state, action) => {
      if (state.addressListApi.loading === "pending") {
        state.addressListApi.error = action.error;
        state.addressList = [];
        state.addressListApi.loading = "idle";
      }
    },
    [getConstituentCodeList.pending]: (state) => {
      if (state.constituentCodeListApi.loading === "idle") {
        state.constituentCodeListApi.loading = "pending";
        state.constituentCodeListApi.error = null;
      }
    },
    [getConstituentCodeList.fulfilled]: (state, action) => {
      if (state.constituentCodeListApi.loading === "pending") {
        state.constituentCodeList = action.payload.value;
        state.constituentCodeListApi.loading = "idle";
      }
    },
    [getConstituentCodeList.rejected]: (state, action) => {
      if (state.constituentCodeListApi.loading === "pending") {
        state.constituentCodeListApi.error = action.error;
        state.constituentCodeList = [];
        state.constituentCodeListApi.loading = "idle";
      }
    },
    [getConstituentCodeDetails.pending]: (state) => {
      if (state.constituentCodeDetailApi.loading === "idle") {
        state.constituentCodeDetailApi.loading = "pending";
        state.constituentCodeDetailApi.error = null;
      }
    },
    [getConstituentCodeDetails.fulfilled]: (state, action) => {
      if (state.constituentCodeDetailApi.loading === "pending") {
        state.constituentCodeDetail = action.payload
        state.constituentCodeDetailApi.loading = "idle";
      }
    },
    [getConstituentCodeDetails.rejected]: (state, action) => {
      if (state.constituentCodeDetailApi.loading === "pending") {
        state.constituentCodeDetailApi.error = action.error;
        state.constituentCodeDetail = {};
        state.constituentCodeDetailApi.loading = "idle";
      }
    },
    [getConstituentCodeListInConstituent.pending]: (state) => {
      if (state.constituentCodeListInConstituentApi.loading === "idle") {
        state.constituentCodeListInConstituentApi.loading = "pending";
        state.constituentCodeListInConstituentApi.error = null;
      }
    },
    [getConstituentCodeListInConstituent.fulfilled]: (state, action) => {
      if (state.constituentCodeListInConstituentApi.loading === "pending") {
        state.constituentCodeListInConstituent = action.payload.value;
        state.constituentCodeListInConstituentApi.loading = "idle";
      }
    },
    [getConstituentCodeListInConstituent.rejected]: (state, action) => {
      if (state.constituentCodeListInConstituentApi.loading === "pending") {
        state.constituentCodeListInConstituentApi.error = action.error;
        state.constituentCodeListInConstituent = [];
        state.constituentCodeListInConstituentApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategories.pending]: (state) => {
      if (state.constituentCustomFieldCategoriesApi.loading === "idle") {
        state.constituentCustomFieldCategoriesApi.loading = "pending";
        state.constituentCustomFieldCategoriesApi.error = null;
      }
    },
    [getConstituentCustomFieldCategories.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldCategoriesApi.loading === "pending") {
        state.constituentCustomFieldCategories = action.payload.value;
        state.constituentCustomFieldCategoriesApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategories.rejected]: (state, action) => {
      if (state.constituentCustomFieldCategoriesApi.loading === "pending") {
        state.constituentCustomFieldCategoriesApi.error = action.error;
        state.constituentCustomFieldCategories = [];
        state.constituentCustomFieldCategoriesApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesDetails.pending]: (state) => {
      if (state.constituentCustomFieldCategoriesDetailsApi.loading === "idle") {
        state.constituentCustomFieldCategoriesDetailsApi.loading = "pending";
        state.constituentCustomFieldCategoriesDetailsApi.error = null;
      }
    },
    [getConstituentCustomFieldCategoriesDetails.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldCategoriesDetailsApi.loading === "pending") {
        state.constituentCustomFieldCategoriesDetails = action.payload.value;
        state.constituentCustomFieldCategoriesDetailsApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesDetails.rejected]: (state, action) => {
      if (state.constituentCustomFieldCategoriesDetailsApi.loading === "pending") {
        state.constituentCustomFieldCategoriesDetailsApi.error = action.error;
        state.constituentCustomFieldCategoriesDetails = [];
        state.constituentCustomFieldCategoriesDetailsApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesValues.pending]: (state) => {
      if (state.constituentCustomFieldCategoriesValuesApi.loading === "idle") {
        state.constituentCustomFieldCategoriesValuesApi.loading = "pending";
        state.constituentCustomFieldCategoriesValuesApi.error = null;
      }
    },
    [getConstituentCustomFieldCategoriesValues.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldCategoriesValuesApi.loading === "pending") {
        state.constituentCustomFieldCategoriesValues = action.payload.value;
        state.constituentCustomFieldCategoriesValuesApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesValues.rejected]: (state, action) => {
      if (state.constituentCustomFieldCategoriesValuesApi.loading === "pending") {
        state.constituentCustomFieldCategoriesValuesApi.error = action.error;
        state.constituentCustomFieldCategoriesValues = [];
        state.constituentCustomFieldCategoriesValuesApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldList.pending]: (state) => {
      if (state.constituentCustomFieldListApi.loading === "idle") {
        state.constituentCustomFieldListApi.loading = "pending";
        state.constituentCustomFieldListApi.error = null;
      }
    },
    [getConstituentCustomFieldList.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldListApi.loading === "pending") {
        state.constituentCustomFieldList = action.payload.value;
        state.constituentCustomFieldListApi.loading = "idle";
      }
    },
    [getConstituentCustomFieldList.rejected]: (state, action) => {
      if (state.constituentCustomFieldListApi.loading === "pending") {
        state.constituentCustomFieldListApi.error = action.error;
        state.constituentCustomFieldList = [];
        state.constituentCustomFieldListApi.loading = "idle";
      }
    },
    [constituentList.fulfilled]: (state, action) => {
      if (state.constituentListApi.loading === "pending") {
        state.constituentList = action.payload.value;
        state.constituentListApi.loading = "idle";
      }
    },
    [constituentList.rejected]: (state, action) => {
      if (state.constituentListApi.loading === "pending") {
        state.constituentListApi.error = action.error;
        state.constituentListApi.loading = "idle";
      }
    },
    [constituentList.pending]: (state, action) => {
      if (state.constituentListApi.loading === "idle") {
        state.constituentListApi.loading = "pending";
        state.constituentListApi.error = null;
      }
    },

    [createConstituent.fulfilled]: (state, action) => {
      if (state.constituentListApi.loading === "pending") {
        state.constituentList = action.payload.value;
        state.createConstituentApi.loading = "idle";
      }
    },
    [createConstituent.rejected]: (state, action) => {
      if (state.createConstituentApi.loading === "pending") {
        state.createConstituentApi.error = action.error;
        state.createConstituentApi.loading = "idle";
      }
    },
    [createConstituent.pending]: (state, action) => {
      if (state.createConstituentApi.loading === "idle") {
        state.createConstituentApi.loading = "pending";
        state.createConstituentApi.error = null;
      }
    },
    [consentChannels.fulfilled]: (state, action) => {
      if (state.consentChannelsApi.loading === "pending") {
        state.consentChannelsData = action.payload.value;
        state.consentChannelsApi.loading = "idle";
      }
    },
    [consentChannels.rejected]: (state, action) => {
      if (state.consentChannelsApi.loading === "pending") {
        state.consentChannelsApi.error = action.error;
        state.consentChannelsApi.loading = "idle";
      }
    },
    [consentChannels.pending]: (state, action) => {
      if (state.consentChannelsApi.loading === "idle") {
        state.consentChannelsApi.loading = "pending";
        state.consentChannelsApi.error = null;
      }
    },
    [constituentAppealList.fulfilled]: (state, action) => {
      if (state.constituentAppealListApi.loading === "pending") {
        state.constituentAppealListData = action.payload.value;
        state.constituentAppealListApi.loading = "idle";
      }
    },
    [constituentAppealList.rejected]: (state, action) => {
      if (state.constituentAppealListApi.loading === "pending") {
        state.constituentAppealListApi.error = action.error;
        state.constituentAppealListApi.loading = "idle";
      }
    },
    [constituentAppealList.pending]: (state, action) => {
      if (state.constituentAppealListApi.loading === "idle") {
        state.constituentAppealListApi.loading = "pending";
        state.constituentAppealListApi.error = null;
      }
    },
    [constituentAttachmentList.fulfilled]: (state, action) => {
      if (state.constituentAttachmentListApi.loading === "pending") {
        state.constituentAttachmentListData = action.payload.value;
        state.constituentAttachmentListApi.loading = "idle";
      }
    },
    [constituentAttachmentList.rejected]: (state, action) => {
      if (state.constituentAttachmentListApi.loading === "pending") {
        state.constituentAttachmentListApi.error = action.error;
        state.constituentAttachmentListApi.loading = "idle";
      }
    },
    [constituentAttachmentList.pending]: (state, action) => {
      if (state.constituentAttachmentListApi.loading === "idle") {
        state.constituentAttachmentListApi.loading = "pending";
        state.constituentAttachmentListApi.error = null;
      }
    },
    [constituentDetailsById.fulfilled]: (state, action) => {
      if (state.constituentDetailsApi.loading === "pending") {
        state.constituentDetailsData = action.payload;
        state.constituentDetailsApi.loading = "idle";
      }
    },
    [constituentDetailsById.rejected]: (state, action) => {
      if (state.constituentDetailsApi.loading === "pending") {
        state.constituentDetailsApi.error = action.error;
        state.constituentDetailsApi.loading = "idle";
      }
    },
    [constituentDetailsById.pending]: (state, action) => {
      if (state.constituentDetailsApi.loading === "idle") {
        state.constituentDetailsApi.loading = "pending";
        state.constituentDetailsApi.error = null;
      }
    },
    [educationList.fulfilled]: (state, action) => {
      if (state.educationListApi.loading === "pending") {
        state.educationListData = action.payload.value;
        state.educationListApi.loading = "idle";
      }
    },
    [educationList.rejected]: (state, action) => {
      if (state.educationListApi.loading === "pending") {
        state.educationListApi.error = action.error;
        state.educationListApi.loading = "idle";
      }
    },
    [educationList.pending]: (state, action) => {
      if (state.educationListApi.loading === "idle") {
        state.educationListApi.loading = "pending";
        state.educationListApi.error = null;
      }
    },
    [currencyConfiguration.fulfilled]: (state, action) => {
      if (state.currencyConfigurationApi.loading === "pending") {
        state.currencyConfigurationData = action.payload;
        state.currencyConfigurationApi.loading = "idle";
      }
    },
    [currencyConfiguration.rejected]: (state, action) => {
      if (state.currencyConfigurationApi.loading === "pending") {
        state.currencyConfigurationApi.error = action.error;
        state.currencyConfigurationApi.loading = "idle";
      }
    },
    [currencyConfiguration.pending]: (state, action) => {
      if (state.currencyConfigurationApi.loading === "idle") {
        state.currencyConfigurationApi.loading = "pending";
        state.currencyConfigurationApi.error = null;
      }
    },
    [countriesList.fulfilled]: (state, action) => {
      if (state.countriesListApi.loading === "pending") {
        state.countriesListData = action.payload;
        state.countriesListApi.loading = "idle";
      }
    },
    [countriesList.rejected]: (state, action) => {
      if (state.countriesListApi.loading === "pending") {
        state.countriesListApi.error = action.error;
        state.countriesListApi.loading = "idle";
      }
    },
    [countriesList.pending]: (state, action) => {
      if (state.countriesListApi.loading === "idle") {
        state.countriesListApi.loading = "pending";
        state.countriesListApi.error = null;
      }
    }
  }
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { Alert } from "react-native";
export const eventList = createAsyncThunk("events/eventList", async accessToken => {
  try {
    const response = await api.getEventListing(accessToken);
    return response.data;
  } catch (error) {
    Alert.alert("Error", error.message);
    throw new Error();
  }
});
export const eventDetails = createAsyncThunk("events/eventDetails", async data => {
  try {
    const response = await api.getEventDetails(data.token, data.id);
    return response.data;
  } catch (error) {
    Alert.alert("Error", error.message);
    throw new Error();
  }
});
export const attendeeList = createAsyncThunk("events/attendeeList", async data => {
  try {
    const response = await api.getAttendeeList(data.token, data.id);
    return response.data;
  } catch (error) {
    Alert.alert("Error", error.message);
    throw new Error();
  }
});

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
      console.log(error.response);
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);

export const getConstituentCustomFieldList = createAsyncThunk(
  "constituents/customFieldList",
  async (token) => {
    try {
      const response = await api.getConstituentCustomFieldList(token);
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
  eventList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  eventDetails: {
    entities: {},
    api: {
      loading: "idle",
      error: null
    }
  },
  attendeeList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  accessToken: null,
  addressList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentCodeList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentCodeDetail: {
    entities: {},
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentCodeListInConstituent: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentCustomFieldCategories: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentCustomFieldCategoriesDetails: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentCustomFieldCategoriesValues: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentCustomFieldList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  consentChannelsData: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentAppealListData: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentAttachmentListData: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  constituentDetail: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationListData: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  currencyConfigurationData: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  countriesListData: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  createConstituentApi: { loading: "idle", error: null },
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
    [eventList.pending]: state => {
      if (state.eventList.api.loading === "idle") {
        state.eventList.api.loading = "pending";
        state.eventList.api.error = null;
      }
    },
    [eventList.fulfilled]: (state, action) => {
      if (state.eventList.api.loading === "pending") {
        state.eventList.entities = action.payload.value;
        state.eventList.api.loading = "idle";
      }
    },
    [eventList.rejected]: (state, action) => {
      if (state.eventList.api.loading === "pending") {
        state.eventList.api.error = action.error;
        state.eventList.api.loading = "idle";
      }
    },
    [eventDetails.pending]: (state, action) => {
      if (state.eventDetails.api.loading === "idle") {
        state.eventDetails.api.loading = "pending";
        state.eventDetails.api.error = null;
      }
    },
    [eventDetails.fulfilled]: (state, action) => {
      if (state.eventDetails.api.loading === "pending") {
        state.eventDetails.entities = action.payload;
        state.eventDetails.api.loading = "idle";
      }
    },
    [eventDetails.rejected]: (state, action) => {
      if (state.eventDetails.api.loading === "pending") {
        state.eventDetails.api.error = action.error;
        state.eventDetails.api.loading = "idle";
      }
    },
    [attendeeList.pending]: (state, action) => {
      if (state.attendeeList.api.loading === "idle") {
        state.attendeeList.api.loading = "pending";
        state.attendeeList.api.error = null;
      }
    },
    [attendeeList.fulfilled]: (state, action) => {
      if (state.attendeeList.api.loading === "pending") {
        state.attendeeList.entities = action.payload.value;
        state.attendeeList.api.loading = "idle";
      }
    },
    [attendeeList.rejected]: (state, action) => {
      if (state.attendeeList.api.loading === "pending") {
        state.attendeeList.api.error = action.error;
        state.attendeeList.api.loading = "idle";
      }
    },
    [getAddressList.pending]: (state) => {
      if (state.addressList.api.loading === "idle") {
        state.addressList.api.loading = "pending";
        state.addressList.api.error = null;
      }
    },
    [getAddressList.fulfilled]: (state, action) => {
      if (state.addressList.api.loading === "pending") {
        state.addressList.entities = action.payload.value;
        state.addressList.api.loading = "idle";
      }
    },
    [getAddressList.rejected]: (state, action) => {
      if (state.addressList.api.loading === "pending") {
        state.addressList.api.error = action.error;
        state.addressList.entities = [];
        state.addressList.api.loading = "idle";
      }
    },
    [getConstituentCodeList.pending]: (state) => {
      if (state.constituentCodeList.api.loading === "idle") {
        state.constituentCodeList.api.loading = "pending";
        state.constituentCodeList.api.error = null;
      }
    },
    [getConstituentCodeList.fulfilled]: (state, action) => {
      if (state.constituentCodeList.api.loading === "pending") {
        state.constituentCodeList.entities = action.payload.value;
        state.constituentCodeList.api.loading = "idle";
      }
    },
    [getConstituentCodeList.rejected]: (state, action) => {
      if (state.constituentCodeList.api.loading === "pending") {
        state.constituentCodeList.api.error = action.error;
        state.constituentCodeList.entities = [];
        state.constituentCodeList.api.loading = "idle";
      }
    },
    [getConstituentCodeDetails.pending]: (state) => {
      if (state.constituentCodeDetail.api.loading === "idle") {
        state.constituentCodeDetail.api.loading = "pending";
        state.constituentCodeDetail.api.error = null;
      }
    },
    [getConstituentCodeDetails.fulfilled]: (state, action) => {
      if (state.constituentCodeDetail.api.loading === "pending") {
        state.constituentCodeDetail.entities = action.payload
        state.constituentCodeDetail.api.loading = "idle";
      }
    },
    [getConstituentCodeDetails.rejected]: (state, action) => {
      if (state.constituentCodeDetail.api.loading === "pending") {
        state.constituentCodeDetail.api.error = action.error;
        state.constituentCodeDetail.entities = {};
        state.constituentCodeDetail.api.loading = "idle";
      }
    },
    [getConstituentCodeListInConstituent.pending]: (state) => {
      if (state.constituentCodeListInConstituent.api.loading === "idle") {
        state.constituentCodeListInConstituent.api.loading = "pending";
        state.constituentCodeListInConstituent.api.error = null;
      }
    },
    [getConstituentCodeListInConstituent.fulfilled]: (state, action) => {
      if (state.constituentCodeListInConstituent.api.loading === "pending") {
        state.constituentCodeListInConstituent.entities = action.payload.value;
        state.constituentCodeListInConstituent.api.loading = "idle";
      }
    },
    [getConstituentCodeListInConstituent.rejected]: (state, action) => {
      if (state.constituentCodeListInConstituent.api.loading === "pending") {
        state.constituentCodeListInConstituent.api.error = action.error;
        state.constituentCodeListInConstituent.entities = [];
        state.constituentCodeListInConstituent.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategories.pending]: (state) => {
      if (state.constituentCustomFieldCategories.api.loading === "idle") {
        state.constituentCustomFieldCategories.api.loading = "pending";
        state.constituentCustomFieldCategories.api.error = null;
      }
    },
    [getConstituentCustomFieldCategories.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldCategories.api.loading === "pending") {
        state.constituentCustomFieldCategories.entities = action.payload.value;
        state.constituentCustomFieldCategories.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategories.rejected]: (state, action) => {
      if (state.constituentCustomFieldCategories.api.loading === "pending") {
        state.constituentCustomFieldCategories.api.error = action.error;
        state.constituentCustomFieldCategories.entities = [];
        state.constituentCustomFieldCategories.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesDetails.pending]: (state) => {
      if (state.constituentCustomFieldCategoriesDetails.api.loading === "idle") {
        state.constituentCustomFieldCategoriesDetails.api.loading = "pending";
        state.constituentCustomFieldCategoriesDetails.api.error = null;
      }
    },
    [getConstituentCustomFieldCategoriesDetails.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldCategoriesDetails.api.loading === "pending") {
        state.constituentCustomFieldCategoriesDetails.entities = action.payload.value;
        state.constituentCustomFieldCategoriesDetails.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesDetails.rejected]: (state, action) => {
      if (state.constituentCustomFieldCategoriesDetails.api.loading === "pending") {
        state.constituentCustomFieldCategoriesDetails.api.error = action.error;
        state.constituentCustomFieldCategoriesDetails.entities = [];
        state.constituentCustomFieldCategoriesDetails.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesValues.pending]: (state) => {
      if (state.constituentCustomFieldCategoriesValues.api.loading === "idle") {
        state.constituentCustomFieldCategoriesValues.api.loading = "pending";
        state.constituentCustomFieldCategoriesValues.api.error = null;
      }
    },
    [getConstituentCustomFieldCategoriesValues.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldCategoriesValues.api.loading === "pending") {
        state.constituentCustomFieldCategoriesValues.entities = action.payload.value;
        state.constituentCustomFieldCategoriesValues.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesValues.rejected]: (state, action) => {
      if (state.constituentCustomFieldCategoriesValues.api.loading === "pending") {
        state.constituentCustomFieldCategoriesValues.api.error = action.error;
        state.constituentCustomFieldCategoriesValues.entities = [];
        state.constituentCustomFieldCategoriesValues.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldList.pending]: (state) => {
      if (state.constituentCustomFieldList.api.loading === "idle") {
        state.constituentCustomFieldList.api.loading = "pending";
        state.constituentCustomFieldList.api.error = null;
      }
    },
    [getConstituentCustomFieldList.fulfilled]: (state, action) => {
      if (state.constituentCustomFieldList.api.loading === "pending") {
        state.constituentCustomFieldList.entities = action.payload.value;
        state.constituentCustomFieldList.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldList.rejected]: (state, action) => {
      if (state.constituentCustomFieldList.api.loading === "pending") {
        state.constituentCustomFieldList.api.error = action.error;
        state.constituentCustomFieldList.entities = [];
        state.constituentCustomFieldList.api.loading = "idle";
      }
    },
    [constituentList.fulfilled]: (state, action) => {
      if (state.constituentList.api.loading === "pending") {
        state.constituentList.entities = action.payload.value;
        state.constituentList.api.loading = "idle";
      }
    },
    [constituentList.rejected]: (state, action) => {
      if (state.constituentList.api.loading === "pending") {
        state.constituentList.api.error = action.error;
        state.constituentList.api.loading = "idle";
      }
    },
    [constituentList.pending]: (state, action) => {
      if (state.constituentList.api.loading === "idle") {
        state.constituentList.api.loading = "pending";
        state.constituentList.api.error = null;
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
      if (state.consentChannelsData.api.loading === "pending") {
        state.consentChannelsData.entities = action.payload.value;
        state.consentChannelsData.api.loading = "idle";
      }
    },
    [consentChannels.rejected]: (state, action) => {
      if (state.consentChannelsData.api.loading === "pending") {
        state.consentChannelsData.api.error = action.error;
        state.consentChannelsData.api.loading = "idle";
      }
    },
    [consentChannels.pending]: (state, action) => {
      if (state.consentChannelsData.api.loading === "idle") {
        state.consentChannelsData.api.loading = "pending";
        state.consentChannelsData.api.error = null;
      }
    },
    [constituentAppealList.fulfilled]: (state, action) => {
      if (state.constituentAppealListData.api.loading === "pending") {
        state.constituentAppealListData.entities = action.payload.value;
        state.constituentAppealListData.api.loading = "idle";
      }
    },
    [constituentAppealList.rejected]: (state, action) => {
      if (state.constituentAppealListData.api.loading === "pending") {
        state.constituentAppealListData.api.error = action.error;
        state.constituentAppealListData.api.loading = "idle";
      }
    },
    [constituentAppealList.pending]: (state, action) => {
      if (state.constituentAppealListData.api.loading === "idle") {
        state.constituentAppealListData.api.loading = "pending";
        state.constituentAppealListData.api.error = null;
      }
    },
    [constituentAttachmentList.fulfilled]: (state, action) => {
      if (state.constituentAttachmentListData.api.loading === "pending") {
        state.constituentAttachmentListData.entities = action.payload.value;
        state.constituentAttachmentListData.api.loading = "idle";
      }
    },
    [constituentAttachmentList.rejected]: (state, action) => {
      if (state.constituentAttachmentListData.api.loading === "pending") {
        state.constituentAttachmentListData.api.error = action.error;
        state.constituentAttachmentListData.api.loading = "idle";
      }
    },
    [constituentAttachmentList.pending]: (state, action) => {
      if (state.constituentAttachmentListData.api.loading === "idle") {
        state.constituentAttachmentListData.api.loading = "pending";
        state.constituentAttachmentListData.api.error = null;
      }
    },
    [constituentDetailsById.fulfilled]: (state, action) => {
      if (state.constituentDetail.api.loading === "pending") {
        state.constituentDetail.entities = action.payload;
        state.constituentDetail.api.loading = "idle";
      }
    },
    [constituentDetailsById.rejected]: (state, action) => {
      if (state.constituentDetail.api.loading === "pending") {
        state.constituentDetail.api.error = action.error;
        state.constituentDetail.api.loading = "idle";
      }
    },
    [constituentDetailsById.pending]: (state, action) => {
      if (state.constituentDetail.api.loading === "idle") {
        state.constituentDetail.api.loading = "pending";
        state.constituentDetail.api.error = null;
      }
    },
    [educationList.fulfilled]: (state, action) => {
      if (state.educationListData.api.loading === "pending") {
        state.educationListData.entities = action.payload.value;
        state.educationListData.api.loading = "idle";
      }
    },
    [educationList.rejected]: (state, action) => {
      if (state.educationListData.api.loading === "pending") {
        state.educationListData.api.error = action.error;
        state.educationListData.api.loading = "idle";
      }
    },
    [educationList.pending]: (state, action) => {
      if (state.educationListData.api.loading === "idle") {
        state.educationListData.api.loading = "pending";
        state.educationListData.api.error = null;
      }
    },
    [currencyConfiguration.fulfilled]: (state, action) => {
      if (state.currencyConfigurationData.api.loading === "pending") {
        state.currencyConfigurationData.entities = action.payload;
        state.currencyConfigurationData.api.loading = "idle";
      }
    },
    [currencyConfiguration.rejected]: (state, action) => {
      if (state.currencyConfigurationData.api.loading === "pending") {
        state.currencyConfigurationData.api.error = action.error;
        state.currencyConfigurationData.api.loading = "idle";
      }
    },
    [currencyConfiguration.pending]: (state, action) => {
      if (state.currencyConfigurationData.api.loading === "idle") {
        state.currencyConfigurationData.api.loading = "pending";
        state.currencyConfigurationData.api.error = null;
      }
    },
    [countriesList.fulfilled]: (state, action) => {
      if (state.countriesListData.api.loading === "pending") {
        state.countriesListData.entities = action.payload;
        state.countriesListData.api.loading = "idle";
      }
    },
    [countriesList.rejected]: (state, action) => {
      if (state.countriesListData.api.loading === "pending") {
        state.countriesListData.api.error = action.error;
        state.countriesListData.api.loading = "idle";
      }
    },
    [countriesList.pending]: (state, action) => {
      if (state.countriesListData.api.loading === "idle") {
        state.countriesListData.api.loading = "pending";
        state.countriesListData.api.error = null;
      }
    }
  }
});
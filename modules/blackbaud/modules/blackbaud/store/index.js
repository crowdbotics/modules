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
      const response = await api.getConstituentCustomFieldCategoriesDetails(
        data
      );
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
      const response = await api.getConstituentCustomFieldCategoriesValues(
        data
      );
      return response.data;
    } catch (error) {
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

export const constituentCustomFieldListSingleConstituent = createAsyncThunk(
  "constituents/get_constituent_custom_field_list_in_single_constituent",
  async (data) => {
    try {
      const response = await api.getConstituentCustomFieldListSingleConstituent(
        data
      );
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const customFieldEducationList = createAsyncThunk(
  "constituents/get_custom_field_list_in_education",
  async (data) => {
    try {
      const response = await api.getCustomFieldEducationList(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationCustomFieldCategories = createAsyncThunk(
  "constituents/get_education_custom_field_categories",
  async (token) => {
    try {
      const response = await api.getEducationCustomFieldCategories(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationDegrees = createAsyncThunk(
  "constituents/get_education_degrees",
  async (token) => {
    try {
      const response = await api.getEducationDegrees(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationConstituentList = createAsyncThunk(
  "constituents/get_education_list_in_constituent",
  async (data) => {
    try {
      const response = await api.getEducationConstituentList(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationRecordList = createAsyncThunk(
  "constituents/get_education_record",
  async (data) => {
    try {
      const response = await api.getEducationRecord(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationSchoolsList = createAsyncThunk(
  "constituents/get_education_schools",
  async (data) => {
    try {
      const response = await api.getEducationsSchools(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationStatusesList = createAsyncThunk(
  "constituents/get_education_statuses",
  async (token) => {
    try {
      const response = await api.getEducationStatuses(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationSubjectList = createAsyncThunk(
  "constituents/get_education_subjects",
  async (token) => {
    try {
      const response = await api.getEducationSubject(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const educationTypesList = createAsyncThunk(
  "constituents/get_education_types",
  async (token) => {
    try {
      const response = await api.getEducationTypes(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const eventAttachmentList = createAsyncThunk(
  "event/event_id/get_event_attachment_list",
  async (data) => {
    try {
      const response = await api.getEventAttachmentList(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventFees = createAsyncThunk(
  "event/event_id/get_event_fees",
  async (data) => {
    try {
      const response = await api.getEventFees(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventParticipantOptions = createAsyncThunk(
  "event/id/get_event_participant_options",
  async (data) => {
    try {
      const response = await api.getEventParticipantOptions(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventParticipantsList = createAsyncThunk(
  "event/participants_list",
  async (data) => {
    try {
      const response = await api.getEventParticipantsList(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventParticipantsDonation = createAsyncThunk(
  "event/id/get_event_participant_donation",
  async (data) => {
    try {
      const response = await api.getEventParticipantsDonation(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventParticipantFeePayments = createAsyncThunk(
  "event/id/get_event_participant_fee_payments",
  async (data) => {
    try {
      const response = await api.getEventParticipantFeePayments(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventParticipantFees = createAsyncThunk(
  "event/id/get_event_participant_fees",
  async (data) => {
    try {
      const response = await api.getEventParticipantFees(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getParticipantOptions = createAsyncThunk(
  "event/id/get_participant_options",
  async (data) => {
    try {
      const response = await api.getParticipantOptions(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventAttachment = createAsyncThunk(
  "event/get_event_attachment",
  async (data) => {
    try {
      const response = await api.getEventAttachment(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventAttachmentTags = createAsyncThunk(
  "event/get_event_attachment_tags",
  async (token) => {
    try {
      const response = await api.getEventAttachmentTags(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getEventCategories = createAsyncThunk(
  "event/get_event_categories",
  async (token) => {
    try {
      const response = await api.getEventCategories(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getParticipant = createAsyncThunk(
  "event/get_participant",
  async (data) => {
    try {
      const response = await api.getParticipant(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    }
  }
);
export const getParticipantLevels = createAsyncThunk(
  "event/get_participant_levels",
  async (token) => {
    try {
      const response = await api.getParticipantLevels(token);
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
  constituentCustomFieldListSingleConstituent: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  customFieldEducationList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationCustomFieldCategories: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationDegrees: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationConstituentList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationRecordList: {
    entities: {},
    api: {
      loading: "idle",
      error: null
    }
  },
  educationSchoolsList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationStatusesList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationSubjectList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  educationTypesList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  eventAttachmentList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventFees: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventParticipantOptions: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventParticipantsList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  eventParticipantsDonation: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventParticipantFeePayments: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventParticipantFees: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getParticipantOptions: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventAttachment: {
    entities: {},
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventAttachmentTags: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getEventCategories: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getParticipant: {
    entities: {},
    api: {
      loading: "idle",
      error: null
    }
  },
  getParticipantLevels: {
    entities: {},
    api: {
      loading: "idle",
      error: null
    }
  },
  createConstituentApi: { loading: "idle", error: null }
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
        state.constituentCodeDetail.entities = action.payload;
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
      if (
        state.constituentCustomFieldCategoriesDetails.api.loading === "idle"
      ) {
        state.constituentCustomFieldCategoriesDetails.api.loading = "pending";
        state.constituentCustomFieldCategoriesDetails.api.error = null;
      }
    },
    [getConstituentCustomFieldCategoriesDetails.fulfilled]: (state, action) => {
      if (
        state.constituentCustomFieldCategoriesDetails.api.loading === "pending"
      ) {
        state.constituentCustomFieldCategoriesDetails.entities =
          action.payload.value;
        state.constituentCustomFieldCategoriesDetails.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesDetails.rejected]: (state, action) => {
      if (
        state.constituentCustomFieldCategoriesDetails.api.loading === "pending"
      ) {
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
      if (
        state.constituentCustomFieldCategoriesValues.api.loading === "pending"
      ) {
        state.constituentCustomFieldCategoriesValues.entities =
          action.payload.value;
        state.constituentCustomFieldCategoriesValues.api.loading = "idle";
      }
    },
    [getConstituentCustomFieldCategoriesValues.rejected]: (state, action) => {
      if (
        state.constituentCustomFieldCategoriesValues.api.loading === "pending"
      ) {
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
    },
    [constituentCustomFieldListSingleConstituent.fulfilled]: (
      state,
      action
    ) => {
      if (
        state.constituentCustomFieldListSingleConstituent.api.loading ===
        "pending"
      ) {
        state.constituentCustomFieldListSingleConstituent.entities =
          action.payload.value;
        state.constituentCustomFieldListSingleConstituent.api.loading = "idle";
      }
    },
    [constituentCustomFieldListSingleConstituent.rejected]: (state, action) => {
      if (
        state.constituentCustomFieldListSingleConstituent.api.loading ===
        "pending"
      ) {
        state.constituentCustomFieldListSingleConstituent.api.error =
          action.error;
        state.constituentCustomFieldListSingleConstituent.api.loading = "idle";
      }
    },
    [constituentCustomFieldListSingleConstituent.pending]: (state, action) => {
      if (
        state.constituentCustomFieldListSingleConstituent.api.loading === "idle"
      ) {
        state.constituentCustomFieldListSingleConstituent.api.loading =
          "pending";
        state.constituentCustomFieldListSingleConstituent.api.error = null;
      }
    },

    [customFieldEducationList.fulfilled]: (state, action) => {
      if (state.customFieldEducationList.api.loading === "pending") {
        state.customFieldEducationList.entities = action.payload;
        state.customFieldEducationList.api.loading = "idle";
      }
    },
    [customFieldEducationList.rejected]: (state, action) => {
      if (state.customFieldEducationList.api.loading === "pending") {
        state.customFieldEducationList.api.error = action.error;
        state.customFieldEducationList.api.loading = "idle";
      }
    },
    [customFieldEducationList.pending]: (state, action) => {
      if (state.customFieldEducationList.api.loading === "idle") {
        state.customFieldEducationList.api.loading = "pending";
        state.customFieldEducationList.api.error = null;
      }
    },
    [educationCustomFieldCategories.fulfilled]: (state, action) => {
      if (state.educationCustomFieldCategories.api.loading === "pending") {
        state.educationCustomFieldCategories.entities = action.payload.value;
        state.educationCustomFieldCategories.api.loading = "idle";
      }
    },
    [educationCustomFieldCategories.rejected]: (state, action) => {
      if (state.educationCustomFieldCategories.api.loading === "pending") {
        state.educationCustomFieldCategories.api.error = action.error;
        state.educationCustomFieldCategories.api.loading = "idle";
      }
    },
    [educationCustomFieldCategories.pending]: (state, action) => {
      if (state.educationCustomFieldCategories.api.loading === "idle") {
        state.educationCustomFieldCategories.api.loading = "pending";
        state.educationCustomFieldCategories.api.error = null;
      }
    },
    [educationDegrees.fulfilled]: (state, action) => {
      if (state.educationDegrees.api.loading === "pending") {
        state.educationDegrees.entities = action.payload.value;
        state.educationDegrees.api.loading = "idle";
      }
    },
    [educationDegrees.rejected]: (state, action) => {
      if (state.educationDegrees.api.loading === "pending") {
        state.educationDegrees.api.error = action.error;
        state.educationDegrees.api.loading = "idle";
      }
    },
    [educationDegrees.pending]: (state, action) => {
      if (state.educationDegrees.api.loading === "idle") {
        state.educationDegrees.api.loading = "pending";
        state.educationDegrees.api.error = null;
      }
    },
    [educationConstituentList.fulfilled]: (state, action) => {
      if (state.educationConstituentList.api.loading === "pending") {
        state.educationConstituentList.entities = action.payload.value;
        state.educationConstituentList.api.loading = "idle";
      }
    },
    [educationConstituentList.rejected]: (state, action) => {
      if (state.educationConstituentList.api.loading === "pending") {
        state.educationConstituentList.api.error = action.error;
        state.educationConstituentList.api.loading = "idle";
      }
    },
    [educationConstituentList.pending]: (state, action) => {
      if (state.educationConstituentList.api.loading === "idle") {
        state.educationConstituentList.api.loading = "pending";
        state.educationConstituentList.api.error = null;
      }
    },
    [educationRecordList.fulfilled]: (state, action) => {
      if (state.educationRecordList.api.loading === "pending") {
        state.educationRecordList.entities = action.payload;
        state.educationRecordList.api.loading = "idle";
      }
    },
    [educationRecordList.rejected]: (state, action) => {
      if (state.educationRecordList.api.loading === "pending") {
        state.educationRecordList.api.error = action.error;
        state.educationRecordList.api.loading = "idle";
      }
    },
    [educationRecordList.pending]: (state, action) => {
      if (state.educationRecordList.api.loading === "idle") {
        state.educationRecordList.api.loading = "pending";
        state.educationRecordList.api.error = null;
      }
    },
    [educationSchoolsList.fulfilled]: (state, action) => {
      if (state.educationSchoolsList.api.loading === "pending") {
        state.educationSchoolsList.entities = action.payload.value;
        state.educationSchoolsList.api.loading = "idle";
      }
    },
    [educationSchoolsList.rejected]: (state, action) => {
      if (state.educationSchoolsList.api.loading === "pending") {
        state.educationSchoolsList.api.error = action.error;
        state.educationSchoolsList.api.loading = "idle";
      }
    },
    [educationSchoolsList.pending]: (state, action) => {
      if (state.educationSchoolsList.api.loading === "idle") {
        state.educationSchoolsList.api.loading = "pending";
        state.educationSchoolsList.api.error = null;
      }
    },
    [educationStatusesList.fulfilled]: (state, action) => {
      if (state.educationStatusesList.api.loading === "pending") {
        state.educationStatusesList.entities = action.payload.value;
        state.educationStatusesList.api.loading = "idle";
      }
    },
    [educationStatusesList.rejected]: (state, action) => {
      if (state.educationStatusesList.api.loading === "pending") {
        state.educationStatusesList.api.error = action.error;
        state.educationStatusesList.api.loading = "idle";
      }
    },
    [educationStatusesList.pending]: (state, action) => {
      if (state.educationStatusesList.api.loading === "idle") {
        state.educationStatusesList.api.loading = "pending";
        state.educationStatusesList.api.error = null;
      }
    },
    [educationSubjectList.fulfilled]: (state, action) => {
      if (state.educationSubjectList.api.loading === "pending") {
        state.educationSubjectList.entities = action.payload.value;
        state.educationSubjectList.api.loading = "idle";
      }
    },
    [educationSubjectList.rejected]: (state, action) => {
      if (state.educationSubjectList.api.loading === "pending") {
        state.educationSubjectList.api.error = action.error;
        state.educationSubjectList.api.loading = "idle";
      }
    },
    [educationSubjectList.pending]: (state, action) => {
      if (state.educationSubjectList.api.loading === "idle") {
        state.educationSubjectList.api.loading = "pending";
        state.educationSubjectList.api.error = null;
      }
    },
    [educationTypesList.fulfilled]: (state, action) => {
      if (state.educationTypesList.api.loading === "pending") {
        state.educationTypesList.entities = action.payload.value;
        state.educationTypesList.api.loading = "idle";
      }
    },
    [educationSubjectList.rejected]: (state, action) => {
      if (state.educationTypesList.api.loading === "pending") {
        state.educationTypesList.api.error = action.error;
        state.educationTypesList.api.loading = "idle";
      }
    },
    [educationTypesList.pending]: (state, action) => {
      if (state.educationTypesList.api.loading === "idle") {
        state.educationTypesList.api.loading = "pending";
        state.educationTypesList.api.error = null;
      }
    },
    [eventAttachmentList.fulfilled]: (state, action) => {
      if (state.eventAttachmentList.api.loading === "pending") {
        state.eventAttachmentList.entities = action.payload.value;
        state.eventAttachmentList.api.loading = "idle";
      }
    },
    [eventAttachmentList.rejected]: (state, action) => {
      if (state.eventAttachmentList.api.loading === "pending") {
        state.eventAttachmentList.api.error = action.error;
        state.eventAttachmentList.api.loading = "idle";
      }
    },
    [eventAttachmentList.pending]: (state, action) => {
      if (state.eventAttachmentList.api.loading === "idle") {
        state.eventAttachmentList.api.loading = "pending";
        state.eventAttachmentList.api.error = null;
      }
    },
    [getEventFees.fulfilled]: (state, action) => {
      if (state.getEventFees.api.loading === "pending") {
        state.getEventFees.entities = action.payload.value;
        state.getEventFees.api.loading = "idle";
      }
    },
    [getEventFees.rejected]: (state, action) => {
      if (state.getEventFees.api.loading === "pending") {
        state.getEventFees.api.error = action.error;
        state.getEventFees.api.loading = "idle";
      }
    },
    [getEventFees.pending]: (state, action) => {
      if (state.getEventFees.api.loading === "idle") {
        state.getEventFees.api.loading = "pending";
        state.getEventFees.api.error = null;
      }
    },
    [getEventParticipantOptions.fulfilled]: (state, action) => {
      if (state.getEventParticipantOptions.api.loading === "pending") {
        state.getEventParticipantOptions.entities = action.payload.value;
        state.getEventParticipantOptions.api.loading = "idle";
      }
    },
    [getEventParticipantOptions.rejected]: (state, action) => {
      if (state.getEventParticipantOptions.api.loading === "pending") {
        state.getEventParticipantOptions.api.error = action.error;
        state.getEventParticipantOptions.api.loading = "idle";
      }
    },
    [getEventParticipantOptions.pending]: (state, action) => {
      if (state.getEventParticipantOptions.api.loading === "idle") {
        state.getEventParticipantOptions.api.loading = "pending";
        state.getEventParticipantOptions.api.error = null;
      }
    },
    [getEventParticipantsList.fulfilled]: (state, action) => {
      if (state.getEventParticipantsList.api.loading === "pending") {
        state.getEventParticipantsList.entities = action.payload.value;
        state.getEventParticipantsList.api.loading = "idle";
      }
    },
    [getEventParticipantsList.rejected]: (state, action) => {
      if (state.getEventParticipantsList.api.loading === "pending") {
        state.getEventParticipantsList.api.error = action.error;
        state.getEventParticipantsList.api.loading = "idle";
      }
    },
    [getEventParticipantsList.pending]: (state, action) => {
      if (state.getEventParticipantsList.api.loading === "idle") {
        state.getEventParticipantsList.api.loading = "pending";
        state.getEventParticipantsList.api.error = null;
      }
    },
    [getEventParticipantsDonation.fulfilled]: (state, action) => {
      if (state.eventParticipantsDonation.api.loading === "pending") {
        state.eventParticipantsDonation.entities = action.payload.value;
        state.eventParticipantsDonation.api.loading = "idle";
      }
    },
    [getEventParticipantsDonation.rejected]: (state, action) => {
      if (state.eventParticipantsDonation.api.loading === "pending") {
        state.eventParticipantsDonation.api.error = action.error;
        state.eventParticipantsDonation.api.loading = "idle";
      }
    },
    [getEventParticipantsDonation.pending]: (state, action) => {
      if (state.eventParticipantsDonation.api.loading === "idle") {
        state.eventParticipantsDonation.api.loading = "pending";
        state.eventParticipantsDonation.api.error = null;
      }
    },
    [getEventParticipantFeePayments.fulfilled]: (state, action) => {
      if (state.getEventParticipantFeePayments.api.loading === "pending") {
        state.getEventParticipantFeePayments.entities = action.payload.value;
        state.getEventParticipantFeePayments.api.loading = "idle";
      }
    },
    [getEventParticipantFeePayments.rejected]: (state, action) => {
      if (state.getEventParticipantFeePayments.api.loading === "pending") {
        state.getEventParticipantFeePayments.api.error = action.error;
        state.getEventParticipantFeePayments.api.loading = "idle";
      }
    },
    [getEventParticipantFeePayments.pending]: (state, action) => {
      if (state.getEventParticipantFeePayments.api.loading === "idle") {
        state.getEventParticipantFeePayments.api.loading = "pending";
        state.getEventParticipantFeePayments.api.error = null;
      }
    },
    [getEventParticipantFees.fulfilled]: (state, action) => {
      if (state.getEventParticipantFees.api.loading === "pending") {
        state.getEventParticipantFees.entities = action.payload.value;
        state.getEventParticipantFees.api.loading = "idle";
      }
    },
    [getEventParticipantFees.rejected]: (state, action) => {
      if (state.getEventParticipantFees.api.loading === "pending") {
        state.getEventParticipantFees.api.error = action.error;
        state.getEventParticipantFees.api.loading = "idle";
      }
    },
    [getEventParticipantFees.pending]: (state, action) => {
      if (state.getEventParticipantFees.api.loading === "idle") {
        state.getEventParticipantFees.api.loading = "pending";
        state.getEventParticipantFees.api.error = null;
      }
    },
    [getEventAttachment.fulfilled]: (state, action) => {
      if (state.getEventAttachment.api.loading === "pending") {
        state.getEventAttachment.entities = action.payload;
        state.getEventAttachment.api.loading = "idle";
      }
    },
    [getEventAttachment.rejected]: (state, action) => {
      if (state.getEventAttachment.api.loading === "pending") {
        state.getEventAttachment.api.error = action.error;
        state.getEventAttachment.api.loading = "idle";
      }
    },
    [getEventAttachment.pending]: (state, action) => {
      if (state.getEventAttachment.api.loading === "idle") {
        state.getEventAttachment.api.loading = "pending";
        state.getEventAttachment.api.error = null;
      }
    },
    [getEventAttachmentTags.fulfilled]: (state, action) => {
      if (state.getEventAttachmentTags.api.loading === "pending") {
        state.getEventAttachmentTags.entities = action.payload.value;
        state.getEventAttachmentTags.api.loading = "idle";
      }
    },
    [getEventAttachmentTags.rejected]: (state, action) => {
      if (state.getEventAttachmentTags.api.loading === "pending") {
        state.getEventAttachmentTags.api.error = action.error;
        state.getEventAttachmentTags.api.loading = "idle";
      }
    },
    [getEventAttachmentTags.pending]: (state, action) => {
      if (state.getEventAttachmentTags.api.loading === "idle") {
        state.getEventAttachmentTags.api.loading = "pending";
        state.getEventAttachmentTags.api.error = null;
      }
    },
    [getEventCategories.fulfilled]: (state, action) => {
      if (state.getEventCategories.api.loading === "pending") {
        state.getEventCategories.entities = action.payload.value;
        state.getEventCategories.api.loading = "idle";
      }
    },
    [getEventCategories.rejected]: (state, action) => {
      if (state.getEventCategories.api.loading === "pending") {
        state.getEventCategories.api.error = action.error;
        state.getEventCategories.api.loading = "idle";
      }
    },
    [getEventCategories.pending]: (state, action) => {
      if (state.getEventCategories.api.loading === "idle") {
        state.getEventCategories.api.loading = "pending";
        state.getEventCategories.api.error = null;
      }
    },
    [getParticipant.fulfilled]: (state, action) => {
      if (state.getParticipant.api.loading === "pending") {
        state.getParticipant.entities = action.payload;
        state.getParticipant.api.loading = "idle";
      }
    },
    [getParticipant.rejected]: (state, action) => {
      if (state.getParticipant.api.loading === "pending") {
        state.getParticipant.api.error = action.error;
        state.getParticipant.api.loading = "idle";
      }
    },
    [getParticipant.pending]: (state, action) => {
      if (state.getParticipant.api.loading === "idle") {
        state.getParticipant.api.loading = "pending";
        state.getParticipant.api.error = null;
      }
    },
    [getParticipantLevels.fulfilled]: (state, action) => {
      if (state.getParticipantLevels.api.loading === "pending") {
        state.getParticipantLevels.entities = action.payload.value;
        state.getParticipantLevels.api.loading = "idle";
      }
    },
    [getParticipantLevels.rejected]: (state, action) => {
      if (state.getParticipantLevels.api.loading === "pending") {
        state.getParticipantLevels.api.error = action.error;
        state.getParticipantLevels.api.loading = "idle";
      }
    },
    [getParticipantLevels.pending]: (state, action) => {
      if (state.getParticipantLevels.api.loading === "idle") {
        state.getParticipantLevels.api.loading = "pending";
        state.getParticipantLevels.api.error = null;
      }
    }
  }
});

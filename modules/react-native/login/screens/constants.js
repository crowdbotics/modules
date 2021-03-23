import React, { useRef } from "react";

export const LOGO_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png";
export const BACKGROUND_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/halfbg.png";
export const validateEmail = /^[^\s]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Change here the  name of the screen you want to redirect after Login
export const HOME_SCREEN_NAME = "Onboarding";

export const usePrevious = (value, initial = {}) => {
  const targetRef = useRef(value);
  const previousRef = useRef(initial);
  if (targetRef.current !== value) {
    previousRef.current = targetRef.current;
    targetRef.current = value;
  }
  return previousRef.current;
};

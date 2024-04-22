import { ActionFunction } from "../types";
import createStory, { createStories, CreateStoriesParameters, CreateStoryParameters } from "./createStory";
import fetchDataFromApi, { FetchDataFromApiParameters } from "./fetchDataFromApi";
import { InputValuesParameters } from "./inputValues";
import math, { MathParameters } from "./math";
import transform, { TransformEachParameters, TransformParameters, transformEach } from "./transform";
import inputValues from "./inputValues";

type Actions = {
  fetchDataFromApi: ActionFunction<FetchDataFromApiParameters>,
  math: ActionFunction<MathParameters>,
  transform: ActionFunction<TransformParameters>,
  transformEach: ActionFunction<TransformEachParameters>,
  createStory: ActionFunction<CreateStoryParameters>,
  createStories: ActionFunction<CreateStoriesParameters>,
  inputValues: ActionFunction<InputValuesParameters>,
};

const actions: Actions = {
  fetchDataFromApi,
  math,
  transform: transform,
  transformEach,
  createStory,
  createStories,
  inputValues,
}

export default actions;
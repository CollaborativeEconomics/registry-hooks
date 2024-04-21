import { ActionFunction } from "../types";
import createStory, { createStories, CreateStoriesParameters, CreateStoryParameters } from "./createStory";
import fetchDataFromApi, { FetchDataFromApiParameters } from "./fetchDataFromApi";
import math, { MathParameters } from "./math";
import transform, { TransformEachParameters, TransformParameters, transformEach } from "./transform";

type Actions = {
  fetchDataFromApi: ActionFunction<FetchDataFromApiParameters>,
  math: ActionFunction<MathParameters>,
  transform: ActionFunction<TransformParameters>,
  transformEach: ActionFunction<TransformEachParameters>,
  createStory: ActionFunction<CreateStoryParameters>,
  createStories: ActionFunction<CreateStoriesParameters>,
};

const actions: Actions = {
  fetchDataFromApi,
  math,
  transform: transform,
  transformEach,
  createStory,
  createStories,
}

export default actions;
import { ActionFunction } from "../types";
import createStory, { CreateStoryParameters } from "./createStory";
import fetchDataFromApi, { FetchDataFromApiParameters } from "./fetchDataFromApi";
import math, { MathParameters } from "./math";
import transform, { TransformParameters } from "./transform";

type Actions = {
  fetchDataFromApi: ActionFunction<FetchDataFromApiParameters>,
  math: ActionFunction<MathParameters>,
  transform: ActionFunction<TransformParameters>,
  createStory: ActionFunction<CreateStoryParameters>,
};

const actions: Actions = {
  fetchDataFromApi,
  math,
  transform: transform,
  createStory,
}

export default actions;
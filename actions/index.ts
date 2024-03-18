import { ActionFunction } from "../types";
import fetchDataFromAPI, { FetchDataFromAPIParameters } from "./fetchDataFromAPI";
import math, { MathParameters } from "./math";
import transform, { TransformParameters } from "./transform";

type Actions = {
  fetchDataFromAPI: ActionFunction<FetchDataFromAPIParameters>,
  math: ActionFunction<MathParameters>,
  transform: ActionFunction<TransformParameters>,
};

const actions: Actions = {
  fetchDataFromAPI,
  math,
  transform: transform,
}

export default actions;
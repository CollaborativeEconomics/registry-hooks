import { ActionFunction } from "../types";
import fetchDataFromApi, { FetchDataFromApiParameters } from "./fetchDataFromApi";
import math, { MathParameters } from "./math";
import transform, { TransformParameters } from "./transform";

type Actions = {
  fetchDataFromApi: ActionFunction<FetchDataFromApiParameters>,
  math: ActionFunction<MathParameters>,
  transform: ActionFunction<TransformParameters>,
};

const actions: Actions = {
  fetchDataFromApi,
  math,
  transform: transform,
}

export default actions;
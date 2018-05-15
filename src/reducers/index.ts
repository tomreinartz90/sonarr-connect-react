/**
 * Created by taren on 14-5-2018.
 */
import { combineReducers } from "redux";
import { series } from "./series.reducer";

export const rootReducers = combineReducers( {
  series,
} );
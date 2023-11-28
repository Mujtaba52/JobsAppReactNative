import { combineReducers } from "redux";

import category from './category'
import register from './register'
import login from './login'
import seeker from './seeker'
import city from './city'
import country from './country'
import company from "./company";
import job from "./job";
import cv from "./cv";
import tag from "./tag";
import interactions from "./interactions";
import bookmark from './bookmark';
import applied from "./applied";
import offers from "./offers"
import coverLetter from "./coverLetter"
import plans from "./plans";
import loading from "./loading";
import error from "./error";
import success from "./success";
import nodata from "./nodata";
import jobsApi from "./jobsApi";


export default combineReducers({ category, register, login, seeker, city, country, company, job, cv, tag, interactions, bookmark, applied, offers, coverLetter, plans, loading, error, success, nodata, jobsApi })

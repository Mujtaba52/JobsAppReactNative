import axios from "axios";

export const API_URL = "https://jobss.com.au/api";

const API = axios.create({ baseURL: `${API_URL}` });

export const register = (
  name,
  username,
  email,
  phone,
  address,
  dob,
  gender,
  password,
  type
) =>
  API.post(`/seekerAuth/register`, {
    name: name,
    username: username,
    email: email,
    phone: phone,
    address: address,
    dob: dob,
    gender: gender,
    password: password,
    type: type,
  });

export const login = (email, password) =>
  API.post("/seekerAuth/login", {
    email: email,
    password: password,
  });

export const google = (
  name,
  username,
  email,
  phone,
  address,
  dob,
  gender,
  password,
  type
) =>
  API.post(`/seekerAuth/google`, {
    name: name,
    username: username,
    email: email,
    phone: phone,
    address: address,
    dob: dob,
    gender: gender,
    password: password,
    type: type,
  });

export const changePassword = (password, id) =>
  API.post("/seekerAuth/password", {
    password: password,
    id: id,
  });

export const registerProvider = (
  name,
  size,
  city,
  country,
  email,
  phone,
  address,
  headquater,
  type,
  password,
  account
) =>
  API.post("/providerAuth/register", {
    name: name,
    size: size,
    city: city,
    country: country,
    email: email,
    phone: phone,
    address: address,
    headquater: headquater,
    type: type,
    password: password,
    account: account,
  });

export const loginProvider = (email, password) =>
  API.post("/providerAuth/login", {
    email: email,
    password: password,
  });

export const googleProvider = (
  name,
  size,
  city,
  country,
  email,
  phone,
  address,
  headquater,
  type,
  password,
  account
) =>
  API.post("/providerAuth/google", {
    name: name,
    size: size,
    city: city,
    country: country,
    email: email,
    phone: phone,
    address: address,
    headquater: headquater,
    type: type,
    password: password,
    account: account,
  });

export const changePasswordProvider = (password, id) =>
  API.post("/providerAuth/password", {
    password: password,
    id: id,
  });

//APPLIED API CALL ==============================
export const applyJob = (job, user, date, proposal) =>
  API.post("/applied/create", {
    job: job,
    user: user,
    date: date,
    proposal: proposal,
  });
export const appliedJobs = (user) => API.post("/applied/user", { user: user });
export const appliedByJob = (job) => API.post("/applied/job", { job: job });
export const appliedByCompany = (company) =>
  API.post("/applied/company", { company: company });

//CATEGORIES API CALL ============================
export const fetchAllCategories = () => API.get(`/categories/all`);
export const fetchFeaturedCategories = () => API.get(`/categories/featured`);

//SEEKERS API CALL ===============================
export const fetchSeeker = (id) => API.post("/seekers/get", { id: id });
export const fetchSeekerByEmail = (email) =>
  API.post("/seekers/email", { email: email });
export const checkSeeker = (id) => API.post("/seekers/check", { id: id });
export const fetchRecommendedUsers = (job) =>
  API.post("/seekers/recommended", { job: job });
export const updateSeeker = (
  name,
  city,
  country,
  username,
  code,
  phone,
  address,
  dob,
  gender,
  id
) =>
  API.put("/seekers/update", {
    name: name,
    city: city,
    country: country,
    username: username,
    code: code,
    phone: phone,
    address: address,
    dob: dob,
    gender: gender,
    id: id,
  });
export const verifySeeker = (verify, code, phone, id) =>
  API.put("/seekers/verify", {
    verify: verify,
    code: code,
    phone: phone,
    id: id,
  });
export const roleUpdate = (role, id) =>
  API.put("/seekers/role", {
    role: role,
    id: id,
  });

//CITIES API CALL
export const fetchAllCities = () => API.get(`/cities/all`);

//COUNTRIES API CALL
export const fetchAllCountries = () => API.get("/countries/all");

//COMPANIES API CALL
export const fetchAllCompanies = () => API.get("/companies/all");
export const fetchCompany = (id) =>
  API.post("/companies/get", {
    id: id,
  });
export const updateCompany = (
  size,
  country,
  city,
  code,
  phone,
  headquater,
  email,
  type,
  id
) =>
  API.put("/companies/update", {
    size: size,
    country: country,
    city: city,
    code: code,
    phone: phone,
    headquater: headquater,
    type: type,
    id: id,
    email: email,
  });
export const verifyCompany = (verify, code, phone, id) =>
  API.put("/companies/verify", {
    verify: verify,
    code: code,
    phone: phone,
    id: id,
  });
export const completeCompany = (
  country,
  city,
  code,
  phone,
  headquater,
  type,
  id
) =>
  API.put("/companies/complete", {
    country: country,
    city: city,
    code: code,
    phone: phone,
    headquater: headquater,
    type: type,
    id: id,
  });
export const completeRegistration = (name, size, id) =>
  API.put("/companies/registration", {
    name: name,
    size: size,
    id: id,
  });

//JOBS API CALL
export const fetchAllJobs = (user) => API.post("/jobs/all", { user: user });
// .then((response) => {
//   // Handle response data
//   console.log("response DATA **", response.data);
// })
// .catch((error) => {
//   // Handle errors
//   console.error("Error fetching jobs:", error);
// });
export const fetchRecentJobs = () => API.get("/jobs/recent");
export const fetchRecommendedJobs = (user, tag) =>
  API.post("/jobs/recommended", { user: user, tag: tag });
export const fetchJobByID = (user, id) =>
  API.post("/jobs/get", { user: user, id: id });
export const fetchJobByCategory = (user, id) =>
  API.post("/jobs/category", { user: user, category: id });
export const fetchJobByCity = (user, id) =>
  API.post("/jobs/city", { user: user, city: id });
export const fetchJobByCompany = (user, id) =>
  API.post("/jobs/company", { user: user, company: id });
export const fetchJobsByProvider = (id) =>
  API.post("/jobs/provider", { company: id });
export const fetchJobsByProviderFeatured = (id) =>
  API.post("/jobs/providerFeatured", { company: id });
export const fetchSearchJob = (search) =>
  API.post(`/apiJobs/jobs`, {
    search: search,
  });

//apiJobs API CALL
export const fetchJobsApiId = (id) =>
  API.post("/apiJobs/job", {
    id: id,
  });

export const fetchApiJobsRecent = (search) =>
  API.post(`/apiJobs/recent`, {
    search: search,
  });

//INTERACTIONS API CALL
export const recordInteraction = (job, user, query, title, interactiontype) =>
  API.post("/interactions/create", {
    job: job,
    user: user,
    query: query,
    title: title,
    interactiontype: interactiontype,
  });
export const fetchInteractionsByUser = (user) =>
  API.post("/interactions/user", { user: user });

//CV API CALL
export const fetchCVByUser = (user) => API.post("/cv/user", { user: user });
export const checkCV = (user) => API.post("/cv/check", { user: user });
export const createCover = (user, job, date, role, intro, body) =>
  API.post("/cover/create", {
    user: user,
    job: job,
    date: date,
    role: role,
    intro: intro,
    body: body,
  });
export const fetchCoverByUser = (user, job) =>
  API.post("cover/user", {
    user: user,
    job: job,
  });
export const cvStatement = (id, statement) =>
  API.post("/cv/statement", {
    id: id,
    statement: statement,
  });
export const addCVEducation = (cv, qualification, timeperiod, institute) =>
  API.post("/cvEducation/create", {
    cv: cv,
    qualification: qualification,
    timeperiod: timeperiod,
    institute: institute,
  });
export const updateCVEducation = (
  cv,
  qualification,
  timeperiod,
  institute,
  id
) =>
  API.put("/cvEducation/update", {
    cv: cv,
    qualification: qualification,
    timeperiod: timeperiod,
    institute: institute,
    id: id,
  });
export const deleteCVEducation = (id) =>
  API.delete("/cvEducation/delete", { data: { id: id } });
export const addCVCareer = (cv, company, job, timeperiod, address, phone) =>
  API.post("/cvCareer/create", {
    cv: cv,
    company: company,
    job: job,
    timeperiod: timeperiod,
    address: address,
    phone: phone,
  });
export const updateCVCareer = (
  cv,
  company,
  job,
  timeperiod,
  address,
  phone,
  id
) =>
  API.put("/cvCareer/update", {
    cv: cv,
    company: company,
    job: job,
    timeperiod: timeperiod,
    address: address,
    phone: phone,
    id: id,
  });
export const deleteCVCareer = (id) =>
  API.delete("/cvCareer/delete", { data: { id: id } });
export const addCVCourse = (cv, course, timeperiod, institute) =>
  API.post("/cvCourse/create", {
    cv: cv,
    course: course,
    timeperiod: timeperiod,
    institute: institute,
  });
export const updateCVCourse = (cv, course, timeperiod, institute, id) =>
  API.put("/cvCourse/update", {
    cv: cv,
    course: course,
    timeperiod: timeperiod,
    institute: institute,
    id: id,
  });
export const deleteCVCourse = (id) =>
  API.delete("/cvCourse/delete", { data: { id: id } });
export const addCVInterest = (cv, interest) =>
  API.post("/cvInterest/create", {
    cv: cv,
    interest: interest,
  });
export const updateCVInterest = (cv, interest, id) =>
  API.put("/cvInterest/update", {
    cv: cv,
    interest: interest,
    id: id,
  });
export const deleteCVInterest = (id) =>
  API.delete("/cvInterest/delete", { data: { id: id } });
export const addCVLanguage = (cv, language) =>
  API.post("/cvLanguage/create", {
    cv: cv,
    language: language,
  });
export const updateCVLanguage = (cv, language, id) =>
  API.put("/cvLanguage/update", {
    cv: cv,
    language: language,
    id: id,
  });
export const deleteCVLanguage = (id) =>
  API.delete("/cvLanguage/delete", { data: { id: id } });

// export const addCVResume = (cv, resume) => API.post('/cvResume/create', {
//     cv: cv,
//     resume: resume
// })

// export const updateCVResume = (cv, resume, id) => API.put('/cvResume/update', {
//     cv: cv,
//     resume: resume,
//     id: id
// })

// export const deleteCVResume = (id) => API.delete('/cvResume/delete', { data: { id: id }})

export const addCVSkill = (cv, skill) =>
  API.post("/cvSkill/create", {
    cv: cv,
    skill: skill,
  });
export const updateCVSkill = (cv, skill, id) =>
  API.put("/cvSkill/update", {
    cv: cv,
    skill: skill,
    id: id,
  });
export const deleteCVSkill = (id) =>
  API.delete("/cvSkill/delete", { data: { id: id } });

//TAGS API CALL
export const fetchtopTags = (user) =>
  API.post("/tags/top", {
    user: user,
  });

//BOOKMARKS API CALL
export const fetchBookmarks = (user) =>
  API.post("/bookmarks/all", { user: user });
export const bookmarkJob = (job, user) =>
  API.post("/bookmarks/add", { job: job, user: user });
export const removeBookmark = (id) =>
  API.delete("/bookmarks/remove", { data: { id: id } });

//OFFERS API CALL
export const sendOffer = (job, user, offerType, offer, offerStatus, date) =>
  API.post("/offers/create", {
    job: job,
    user: user,
    offerType: offerType,
    offer: offer,
    offerStatus: offerStatus,
    date: date,
  });
export const sentOffers = (id) =>
  API.post("/offers/company", {
    company: id,
  });
export const sentOffersByJob = (id) =>
  API.post("/offers/job", {
    job: id,
  });
export const offers = (user) =>
  API.post("/offers/user", {
    user: user,
  });
export const offer = (id) =>
  API.post("/offers/id", {
    id: id,
  });
export const offerResponse = (status, response, responseDate, id) =>
  API.post("/offers/update", {
    status: status,
    response: response,
    responseDate: responseDate,
    id: id,
  });

//PLANS API
export const fetchPlansByType = (type) =>
  API.post("/plans/type", {
    type: type,
  });

export const createUserPlan = (user, plan, activation_date, user_type) =>
  API.post("/userPlans/create", {
    user: user,
    plan: plan,
    activation_date: activation_date,
    user_type: user_type,
  });

//Distribute
export const distributeResume = (data) =>
  API.post(`/distribute`, {
    name: data.name,
    address: data.address,
    phone: data.phone,
    code: data.code,
    email: data.email,
    role: data.role,
    intro: data.statement,
    skills: data.skills,
    careers: data.careers,
    educations: data.educations,
    courses: data.courses,
    interests: data.interests,
  });

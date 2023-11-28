import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import UserType from "./pages/UserType";
import Register from "./pages/Register";
import OnBoarding from "./pages/OnBoarding";
import Home from "./pages/Home";
import { useFonts } from "expo-font";
import AppLoading from "./pages/AppLoading";
import ChangePassword from "./pages/ChangePassword";
import Verify from "./pages/Verify";
import VerificationCode from "./pages/VerificationCode";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import reducers from "./API/reducers/";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Profile from "./pages/Profile";
import PersonalInfo from "./pages/PersonalInfo";
import AccountInfo from "./pages/AccountInfo";
import Companies from './pages/Companies';
import Cities from './pages/Cities';
import Categories from './pages/Categories';
import Termsandconditions from './pages/Termsandconditions';
import Privacypolicy from './pages/Privacypolicy';
import Contactus from './pages/Contactus';
import History from './pages/History';
import Jobs from "./pages/Jobs";
import Resume from './pages/Resume';
import Offers from './pages/Offers';
import JobDetails from './pages/JobDetails';
import AdvanceSearch from './pages/AdvanceSearch';
import PostJob from './pages/PostJob';
import JobPosted from './pages/JobPosted';
import AppliedUsers from './pages/AppliedUsers';
import SentOffers from './pages/SentOffers';
import OfferAccepted from './pages/OfferAccepted';
// import OfferRejected from './pages/OfferRejected';
import Recommendedjobs from './pages/Recommendedjobs';
// import AppliedJobs from './pages/AppliedJobs';
// import SavedJobs from './pages/SavedJobs';
import Search from './pages/Search';
import RecommendedUser from './pages/RecommendedUser';
import AppliedSaved from './pages/AppliedSaved';
import JobsByCity from "./pages/JobsByCity";
import JobsByCategory from "./pages/JobsByCategory";
import JobsByCompany from "./pages/JobsByCompany";
import ProviderProfile from './pages/ProviderProfile';
import ProviderTypeModal from './Components/ProviderTypeModal';
import ApplyModal from './Components/ApplyModal';
import CoverLetter from './pages/CoverLetter';
import CoverLetterForm from './pages/CoverLetterForm';
import JobResponse from "./pages/JobResponse";
import ProviderProfileInfo from './pages/ProviderProfileInfo';
import ProviderAccountManage from './pages/ProviderAccountManage';
import OfferSend from './pages/OfferSend';
import ViewResume from './pages/ViewResume';
import { StripeProvider } from "@stripe/stripe-react-native";
import StripeTest from "./pages/StripeTest";
import PaymentScreen from "./pages/PaymentScreen";
import OffersByJob from "./pages/OffersByJob";
import AppliedByJob from "./pages/AppliedByJob";
import PaymentSuccessful from './pages/PaymentSuccessful';
import GoogleRegister from './pages/GoogleRegister';
import SeekerOfferResponse from './pages/SeekerOfferResponse';
import AcceptResponse from './pages/AcceptResponse';
import AppliedSuccessful from './pages/AppliedSuccessful';
import Plans from './pages/Plans';
import ViewCoverLetter from './pages/ViewCoverLetter';
import CompleteProfileSeekerModal from './Components/CompleteProfileSeekerModal';
import SeeekerNegotiate from './pages/SeeekerNegotiate';
import VerificationProfile from './pages/VerificationProfile';
import ManageCoverLetter from './pages/ManageCoverLetter';
import SeekerPlans from "./pages/SeekerPlans";
import ForgotPassword from './pages/ForgotPassword';
import ProfileVerifiedSuccessful from './pages/ProfileVerifiedSuccessful';
import OfferResponse from './pages/OfferResponse';
import ApiDescription from './pages/ApiDescription';



const store = createStore(reducers, compose(applyMiddleware(thunk)))

const Stack = createNativeStackNavigator();

function App() {

    let [fontLoad] = useFonts({
        'poppins_thin': require('./assets/fonts/poppins_thin.ttf'),
        'poppins_extralight': require('./assets/fonts/poppins_extra_light.ttf'),
        'poppins_light': require('./assets/fonts/poppins_light.ttf'),
        'poppins_regular': require('./assets/fonts/poppins_regular.ttf'),
        'poppins_medium': require('./assets/fonts/poppins_medium.ttf'),
        'poppins_semibold': require('./assets/fonts/poppins_semi_bold.ttf'),
        'poppins_bold': require('./assets/fonts/poppins_bold.ttf'),
        'poppins_extrabold': require('./assets/fonts/poppins_extra_bold.ttf'),
        'poppins_black': require('./assets/fonts/poppins_black.ttf'),
    });

    if (!fontLoad) {
        return <AppLoading />
    }

    return (
        <StripeProvider publishableKey="pk_test_51NpsCXBA5mbdD8e2Tg8MVBCXtomGyF11MzP1eFRceziDGIOGxMwmjToCNFLQEc2zXeYnBUhk89oKcJ9ffXpSikqU00bObmoUIu">
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Splash" component={Splash} options={{ title: "Splash", headerShown: false }} />
                        <Stack.Screen name="UserType" component={UserType}
                            options={{ title: "UserType", headerShown: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ title: "Login", headerShown: false }} />
                        <Stack.Screen name="Register" component={Register}
                            options={{ title: "Register", headerShown: false }} />
                        <Stack.Screen name="Onboarding" component={OnBoarding}
                            options={{ title: "Onboarding", headerShown: false }} />
                        <Stack.Screen name="ChangePassword" component={ChangePassword}
                            options={{ title: "ChangePassword", headerShown: false }} />
                        <Stack.Screen name="Verify" component={Verify} options={{ title: "Verify", headerShown: false }} />
                        <Stack.Screen name="VerificationCode" component={VerificationCode}
                            options={{ title: "VerificationCode", headerShown: false }} />
                        <Stack.Screen name="Home" component={Home} options={{ title: "Home", headerShown: false }} />
                        <Stack.Screen name="Profile" component={Profile}
                            options={{ title: "Profile", headerShown: false }} />
                        <Stack.Screen name="PersonalInfo" component={PersonalInfo}
                            options={{ title: "PersonalInfo", headerShown: false }} />
                        <Stack.Screen name="AccountInfo" component={AccountInfo}
                            options={{ title: "AccountInfo", headerShown: false }} />
                        <Stack.Screen name="Companies" component={Companies}
                            options={{ title: "Companies", headerShown: false }} />
                        <Stack.Screen name="Cities" component={Cities} options={{ title: "Cities", headerShown: false }} />
                        <Stack.Screen name="Categories" component={Categories}
                            options={{ title: "Categories", headerShown: false }} />
                        <Stack.Screen name="Termsandconditions" component={Termsandconditions}
                            options={{ title: "Termsandconditions", headerShown: false }} />
                        <Stack.Screen name="Privacypolicy" component={Privacypolicy}
                            options={{ title: "Privacypolicy", headerShown: false }} />
                        <Stack.Screen name="Contactus" component={Contactus}
                            options={{ title: "Contactus", headerShown: false }} />
                        <Stack.Screen name="History" component={History}
                            options={{ title: "History", headerShown: false }} />
                        <Stack.Screen name="Jobs" component={Jobs} options={{ title: "Jobs", headerShown: false }} />
                        <Stack.Screen name="JobsByCity" component={JobsByCity}
                            options={{ title: "JobsByCity", headerShown: false }} />
                        <Stack.Screen name="JobsByCategory" component={JobsByCategory}
                            options={{ title: "JobsByCategory", headerShown: false }} />
                        <Stack.Screen name="JobsByCompany" component={JobsByCompany}
                            options={{ title: "JobsByCompany", headerShown: false }} />
                        <Stack.Screen name="Resume" component={Resume} options={{ title: "Resume", headerShown: false }} />
                        <Stack.Screen name="Offers" component={Offers} options={{ title: "Offers", headerShown: false }} />
                        <Stack.Screen name="JobDetails" component={JobDetails}
                            options={{ title: "JobDetails", headerShown: false }} />
                        <Stack.Screen name="JobResponse" component={JobResponse}
                            options={{ title: "JobResponse", headerShown: false }} />
                        <Stack.Screen name="AdvanceSearch" component={AdvanceSearch}
                            options={{ title: "AdvanceSearch", headerShown: false }} />
                        <Stack.Screen name="PostJob" component={PostJob}
                            options={{ title: "PostJob", headerShown: false }} />
                        <Stack.Screen name="JobPosted" component={JobPosted}
                            options={{ title: "JobPosted", headerShown: false }} />
                        <Stack.Screen name="AppliedUsers" component={AppliedUsers}
                            options={{ title: "AppliedUsers", headerShown: false }} />
                        <Stack.Screen name="SentOffers" component={SentOffers}
                            options={{ title: "SentOffers", headerShown: false }} />
                        <Stack.Screen name="OfferAccepted" component={OfferAccepted}
                            options={{ title: "OfferAccepted", headerShown: false }} />
                        {/* <Stack.Screen name="OfferRejected" component={OfferRejected}
                                      options={{title: "OfferRejected", headerShown: false}}/> */}
                        <Stack.Screen name="Recommendedjobs" component={Recommendedjobs}
                            options={{ title: "Recommendedjobs", headerShown: false }} />
                        {/* <Stack.Screen name="SavedJobs" component={SavedJobs} options={{title: "SavedJobs", headerShown: false}}/> */}
                        <Stack.Screen name="Search" component={Search} options={{ title: "Search", headerShown: false }} />
                        <Stack.Screen name="RecommendedUser" component={RecommendedUser}
                            options={{ title: "RecommendedUser", headerShown: false }} />
                        <Stack.Screen name="AppliedSaved" component={AppliedSaved}
                            options={{ title: "AppliedSaved", headerShown: false }} />
                        <Stack.Screen name="ProviderProfile" component={ProviderProfile}
                            options={{ title: "ProviderProfile", headerShown: false }} />
                        <Stack.Screen name="ProviderTypeModal" component={ProviderTypeModal}
                            options={{ title: "ProviderTypeModal", headerShown: false }} />
                        <Stack.Screen name="ApplyModal" component={ApplyModal}
                            options={{ title: "ApplyModal", headerShown: false }} />
                        <Stack.Screen name="CoverLetter" component={CoverLetter}
                            options={{ title: "CoverLetter", headerShown: false }} />
                        <Stack.Screen name="CoverLetterForm" component={CoverLetterForm}
                            options={{ title: "CoverLetterForm", headerShown: false }} />
                        <Stack.Screen name="ProviderProfileInfo" component={ProviderProfileInfo}
                            options={{ title: "ProviderProfileInfo", headerShown: false }} />
                        <Stack.Screen name="ProviderAccountManage" component={ProviderAccountManage}
                            options={{ title: "ProviderAccountManage", headerShown: false }} />
                        <Stack.Screen name="OfferSend" component={OfferSend}
                            options={{ title: "OfferSend", headerShown: false }} />
                        <Stack.Screen name="ViewResume" component={ViewResume}
                            options={{ title: "ViewResume", headerShown: false }} />
                        <Stack.Screen name="Stripe" component={StripeTest}
                            options={{ title: "Stripe", headerShown: false }} />
                        <Stack.Screen name="Payment" component={PaymentScreen}
                            options={{ title: "Payment", headerShown: false }} />
                        <Stack.Screen name="OffersByJob" component={OffersByJob}
                            options={{ title: "OffersByJob", headerShown: false }} />
                        <Stack.Screen name="AppliedByJob" component={AppliedByJob}
                            options={{ title: "AppliedByJob", headerShown: false }} />
                        <Stack.Screen name="PaymentSuccessful" component={PaymentSuccessful}
                            options={{ title: "PaymentSuccessful", headerShown: false }} />
                        <Stack.Screen name="GoogleRegister" component={GoogleRegister}
                            options={{ title: "GoogleRegister", headerShown: false }} />
                        <Stack.Screen name="SeekerOfferResponse" component={SeekerOfferResponse}
                            options={{ title: "SeekerOfferResponse", headerShown: false }} />
                        <Stack.Screen name="AcceptResponse" component={AcceptResponse}
                            options={{ title: "AcceptResponse", headerShown: false }} />
                        <Stack.Screen name="AppliedSuccessful" component={AppliedSuccessful}
                            options={{ title: "AppliedSuccessful", headerShown: false }} />
                        <Stack.Screen name="Plans" component={Plans}
                            options={{ title: "Plans", headerShown: false }} />
                        <Stack.Screen name="SeekerPlans" component={SeekerPlans}
                            options={{ title: "SeekerPlans", headerShown: false }} />
                        <Stack.Screen name="ViewCoverLetter" component={ViewCoverLetter}
                            options={{ title: "ViewCoverLetter", headerShown: false }} />
                        <Stack.Screen name="CompleteProfileSeekerModal" component={CompleteProfileSeekerModal}
                            options={{ title: "CompleteProfileSeekerModal", headerShown: false }} />
                        <Stack.Screen name="SeekerNegotiate" component={SeeekerNegotiate}
                            options={{ title: "SeekerNegotiate", headerShown: false }} />
                        <Stack.Screen name="VerificationProfile" component={VerificationProfile}
                            options={{ title: "VerificationProfile", headerShown: false }} />
                        <Stack.Screen name="ManageCoverLetter" component={ManageCoverLetter}
                            options={{ title: "ManageCoverLetter", headerShown: false }} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword}
                            options={{ title: "ForgotPassword", headerShown: false }} />
                        <Stack.Screen name="ProfileVerifiedSuccessful" component={ProfileVerifiedSuccessful}
                            options={{ title: "ProfileVerifiedSuccessful", headerShown: false }} />
                        <Stack.Screen name="OfferResponse" component={OfferResponse}
                            options={{ title: "OfferResponse", headerShown: false }} />
                            <Stack.Screen  name='ApiDescription' component={ApiDescription}
                            options={{title:'ApiDescription' ,headerShown:false}} />

                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </StripeProvider>
    );
}

export default App;

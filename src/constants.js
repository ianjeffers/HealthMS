export const backend_host =  process.env.BACKEND_HOST;

export const exercise_path = "/exercise";
export const food_path = "/food";
export const stress_path = "/stress";
export const medication_path = "/medication";
export const mood_path = "/mood";
export const patterns_path = "/patterns";
export const sleep_path = "/sleep";
export const symptom_path = "/symptom";
export const profile_path = "/profile";
export const about_path = "/about";
export const symptoms_path = "/getSymptoms";
export const ailyssa_path =  "/ailyssa";
export const home_path = "/home";
export const drugsalcohol_path = "/drugsalcohol";
export const allergy_path = "/allergies";
export const illness_path = "/illnesses";

export const authorization_scope = "read:current_user update:current_user_metadata";
export const authorization_domain = process.env.AUTH0_DOMAIN;
export const authorization_client_id = process.env.AUTH0_CLIENT_ID;
export const authorization_audience = "https://" + authorization_domain + "/api/v2/";
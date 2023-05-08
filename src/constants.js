// export const backend_host =  "http://127.0.0.1:5000";
export const backend_host = "health-ms.vercel.app";

export const profile_path = "/profile";
export const about_path = "/about";
export const home_path = "/home";
export const text_entry_path = "/entry"
export const data_view_path = "/view"

export const authorization_scope = "read:current_user update:current_user_metadata";
export const authorization_domain = "dev-86qkwtcn1z6pwzhs.us.auth0.com";
export const authorization_client_id = process.env.AUTH0_CLIENT_ID;
export const authorization_audience = "https://" + authorization_domain + "/api/v2/";
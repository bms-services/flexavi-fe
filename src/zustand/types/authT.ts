export type LoginReq = {
    email: string;
    password: string;
};
export type LoginRes = {
    token: string;
    expires_at: string;
    has_main_company: boolean;
};

export type RegisterReq = {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

export type RegisterRes = {
    user_id: string;
    name: string;
    email: string;
    phone: string;
    language: string;
    has_verified_email: boolean;
    company: null;
    created_at: string;
    updated_at: string;
};

export type ForgotPasswordReq = {
    email: string;
};

export type ForgotPasswordRes = {
    message: string;
};

export type LogoutRes = {
    message: string;
};

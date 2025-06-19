export type LoginReq = {
    email: string;
    password: string;
    remember_me: boolean;
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


export type VerifyRegisterEmployeeReq = {
    token: string;
};

export type VerifyRegisterEmployeeRes = {
    user_id: string;
    company_name: string;
    name: string;
    email: string;
    phone: string;
}

export type RegisterEmployeeReq = {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    token: string;
};
export type RegisterEmployeeRes = {
    user_id: string;
    name: string;
    email: string;
    phone: string;
    language: string;
    has_verified_email: boolean;
    company: null;
    created_at: string;
    updated_at: string;
}

export type ForgotPasswordReq = {
    email: string;
};

export type ForgotPasswordRes = {
    message: string;
};

export type LogoutRes = {
    message: string;
};

export type ResetPasswordReq = {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
};

export type ResetPasswordRes = {
    message: string;
};

export type VerifyResetPasswordReq = {
    token: string;
    email: string;
};

export type VerifyResetPasswordRes = {
    message: string;
    email: string;
    name: string;
};

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const RootRedirect = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    // useEffect(() => {
    //     if (token) {
    //         navigate("/", { replace: true });
    //     } else {
    //         navigate("/", { replace: true });
    //     }
    // }, [token, navigate]);

    return null;
};

export default RootRedirect;

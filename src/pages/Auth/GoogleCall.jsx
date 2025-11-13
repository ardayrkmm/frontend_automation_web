// src/pages/GoogleCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginGoogleSuccess } from "../../features/authSlice";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const email = params.get("email");
    const name = params.get("name");

    if (token) {
      // Simpan token dan user info ke Redux
      dispatch(
        loginGoogleSuccess({ access_token: token, user: { email, name } })
      );
      localStorage.setItem("token", token);

      // Redirect ke home langsung
      navigate("/", { replace: true });
    } else {
      // Kalau gagal, kembali ke login
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate]);

  return <p>Logging you in with Google...</p>;
}

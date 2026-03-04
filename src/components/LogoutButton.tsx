import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";
import { clearAccessToken } from "@/store/authStorage";

export function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAccessToken(); // 🧹 hapus token
    dispatch(logout()); // 🔄 reset redux
    navigate("/login"); // 🚪 redirect
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}
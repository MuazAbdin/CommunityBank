import { FaRightFromBracket } from "react-icons/fa6";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PageHeader({ name }: { name: string }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await fetcher("/v1/auth/logout");
    toast.success("Logged out successfully");
    return navigate("/login");
  }

  return (
    <header>
      <div className="welcome-msg">
        Hello, <strong>{name}</strong>
      </div>
      <button className="btn logout-btn" onClick={handleLogout}>
        <FaRightFromBracket />
        <span>Logout</span>
      </button>
    </header>
  );
}

interface IPageHeaderProps {
  name: string;
  balance: number;
}

export default PageHeader;

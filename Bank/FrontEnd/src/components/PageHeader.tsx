import { FaRightFromBracket } from "react-icons/fa6";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PageHeader({ name = "Muaz Abdin", balance = 2500 }: IPageHeaderProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await fetcher("/v1/auth/logout");
    toast.success("Logged out successfully");
    return navigate("/login");
  }

  const balanceStyle: string = balance < 500 ? "red" : "var(--highlight-color)";

  return (
    <header>
      <div>
        Hello, <strong>{name}</strong>
      </div>
      <button className="btn logout-btn" onClick={handleLogout}>
        <FaRightFromBracket />
        <span>Logout</span>
      </button>
      {/* <div>
        Balance: <strong style={{ color: balanceStyle }}>${balance}</strong>
      </div> */}
    </header>
  );
}

interface IPageHeaderProps {
  name: string;
  balance: number;
}

export default PageHeader;

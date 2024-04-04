import { FaRightFromBracket } from "react-icons/fa6";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HTTPError } from "../utils/cutomErrors";

function PageHeader({ name }: { name: string }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetcher("auth/logout");
      if (!response.ok) throw new HTTPError(response);
      toast.success("Logged out successfully");
      return navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      }
      console.log(error);
      return error;
    }
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

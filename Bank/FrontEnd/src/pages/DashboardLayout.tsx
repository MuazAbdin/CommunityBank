import { Outlet } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/DashboardLayout";
import Aside from "../components/Aside";
import PageHeader from "../components/PageHeader";

function DashboardLayout() {
  return (
    <Wrapper>
      <Aside />
      <PageHeader name="Muaz Abdin" balance={2500} />
      <Outlet />
    </Wrapper>
  );
}

export default DashboardLayout;

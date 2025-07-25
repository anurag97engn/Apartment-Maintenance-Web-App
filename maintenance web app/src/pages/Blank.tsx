import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Owners from "../components/Owners";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="Maintenance Web App"
        description="Maintenance Web App UI"
      />
      <PageBreadcrumb pageTitle="Owners" />
      <Owners />
    </div>
  );
}

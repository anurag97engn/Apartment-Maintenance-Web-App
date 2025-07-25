import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Maintenance from "../components/Maintenance";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="Maintenance Web App"
        description="Maintenance Web App UI"
      />
      <PageBreadcrumb pageTitle="Maintenance" />
      <Maintenance />
    </div>
  );
}

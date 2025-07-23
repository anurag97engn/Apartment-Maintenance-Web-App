import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Dashboard from "../../components/dashboard";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Maintenance Web App"
        description="Maintenance Web App UI"
      />
      <Dashboard />
    </>
  );
}

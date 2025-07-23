import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import NoticeBoard from "../components/NoticeBoard";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="Maintenance Web App"
        description="Maintenance Web App UI"
      />
      <PageBreadcrumb pageTitle="Notice Board" />
      <NoticeBoard />
    </div>
  );
}

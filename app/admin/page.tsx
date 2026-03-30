import { AdminEditor } from "../../components/admin/admin-editor";
import { TENANTS } from "../../lib/cms/default-content";

export default function AdminPage() {
  return <AdminEditor initialSite={TENANTS[0]} />;
}

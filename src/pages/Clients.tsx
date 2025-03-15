import TableClients from "@/components/clients/TableClients";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Clients: React.FC = () => {
  return (
    <>
      <div className="bg-orange-300">
        <div className="max-w-7xl pt-11 pb-8 mx-auto px-8 space-y-8">
          <h1 className="text-3xl">All clients</h1>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Clients</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-11 space-y-8">
        <TableClients />
      </div>
    </>
  );
};

export default Clients;

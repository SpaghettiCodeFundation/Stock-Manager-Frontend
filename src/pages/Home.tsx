import CardLink from "@/components/CardLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BadgeDollarSign,
  Car,
  ChartBarStacked,
  ShoppingBasket,
  UserRoundCheck,
  Users,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"

const home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 mt-11 space-y-8">
      <h1 className="text-3xl">Dashboard</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <CardLink
              icon={<ShoppingBasket />}
              text="Products"
              href="/dashboard/products"
            />
            <CardLink
              icon={<ChartBarStacked />}
              text="Categories"
              href="/dashboard/categories"
            />
            <CardLink
              icon={<Car />}
              text="Providers"
              href="/dashboard/providers"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Administration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <CardLink icon={<Users />} text="Users" href="/dashboard/users" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <CardLink
              icon={<BadgeDollarSign />}
              text="Sales"
              href="/dashboard/sales"
            />
            <CardLink
              icon={<UserRoundCheck />}
              text="Clients"
              href="/dashboard/clients"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default home;

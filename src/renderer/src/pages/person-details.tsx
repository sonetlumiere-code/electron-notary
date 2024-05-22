import PageTitle from "@renderer/components/page-title"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@renderer/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@renderer/components/ui/card"
import { Link } from "react-router-dom"

const PersonDetailsPage = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/persons-list">Lista de personas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalle de ficha</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Detalle de ficha</PageTitle>

      <Card>
        <CardHeader>
          <CardTitle>Ficha de persona</CardTitle>
          <CardDescription>Detalle de ficha de persona</CardDescription>
        </CardHeader>
        <CardContent>form content</CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}

export default PersonDetailsPage

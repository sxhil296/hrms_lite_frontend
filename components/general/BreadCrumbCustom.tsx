"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink } from "@/components/ui/breadcrumb";

interface BreadCrumbCustomProps {
    title: string;
    href: string;
    currentTitle: string;
}
    export const BreadCrumbCustom = ({ title, href, currentTitle }: BreadCrumbCustomProps) => {
    return <Breadcrumb className="mb-10">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{currentTitle}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>;
}
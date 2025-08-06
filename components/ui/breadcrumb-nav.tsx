"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

interface BreadcrumbItemData {
  label: string;
  href?: string;
}

export default function BreadcrumbNav() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItemData[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItemData[] = [];

    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      let label = segment;

      if (segment === "me&stuffs") {
        label = "Me & Stuffs";
      } else if (segment === "posts") {
        label = "Blog";
      } else if (segment === "tools-i-use") {
        label = "Tools I Use";
      } else if (segment === "books-i-read-recommended") {
        label = "Books I Read & Recommend";
      } else if (segment === "research-papers") {
        label = "Research Papers";
      } else if (segment === "designs-and-code") {
        label = "Designs & Code";
      } else if (segment === "gallery-of-my-stuffs") {
        label = "Gallery";
      } else if (
        segments[0] === "posts" &&
        segments.length > 1 &&
        index === 1
      ) {
        label = "Post";
      } else {
        label = segment
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }

      breadcrumbs.push({
        label,
        href: index === segments.length - 1 ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="flex justify-center w-full mt-2">
      <Breadcrumb className="inline-block px-3 py-1 bg-background/50 backdrop-blur-sm font-dm-mono text-sm rounded">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

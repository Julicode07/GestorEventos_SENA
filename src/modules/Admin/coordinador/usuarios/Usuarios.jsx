import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Tooltip,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { columns } from "@modules/Admin/utils/data";
import { EyeIcon } from "@/modules/Admin/components/EyeIcon";
import { INITIAL_VISIBLE_COLUMNS, capitalize } from "./utils/utils";
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);
const TopContent = React.lazy(() =>
  import("./../../components/TopContent.jsx")
);
const BottomContent = React.lazy(() =>
  import("./../../components/BottonContent.jsx")
);

export default function Usuarios() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [showUsers, setShowUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "status",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const getAllUsers = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/all`
    );
    const data = await response.json();
    return data;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setShowUsers(data);
      } catch (error) {
        console.error("Whe had an error to show the data", error);
      }
    };
    fetchData();
  }, [getAllUsers]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filterUsers = [...showUsers];

    if (hasSearchFilter) {
      filterUsers = showUsers.filter(
        (user) =>
          user.document.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.last_names.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.phone.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.role.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filterUsers;
  }, [showUsers, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip
              content="Ver información"
              className="bg-secondary text-white"
            >
              <Button
                href={`/admin/coordinador/eventos/${user.id}`}
                as="a"
                isIconOnly
                className="bg-green-700 hover:bg-green-800"
                aria-label="View event details"
              >
                <EyeIcon className="w-6 h-6 text-white " />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/usuarios">
            Usuarios
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section>
        <TableShowData
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          topContent={
            <TopContent
              filterValue={filterValue}
              onClear={onClear}
              onRowsPerPageChange={onRowsPerPageChange}
              onSearchChange={onSearchChange}
              rowsPerPage={rowsPerPage}
              visibleColumns={visibleColumns}
              module={showUsers}
              setVisibleColumns={setVisibleColumns}
              columns={columns}
              capitalize={capitalize}
            />
          }
          topContentPlacement="outside"
          bottomContent={
            <BottomContent page={page} pages={pages} setPage={setPage} />
          }
          bottomContentPlacement="outside"
          columns={headerColumns}
          items={sortedItems}
          renderCell={renderCell}
          id="id_user"
          aria="Table to show the data of users"
        />
      </section>
    </main>
  );
}

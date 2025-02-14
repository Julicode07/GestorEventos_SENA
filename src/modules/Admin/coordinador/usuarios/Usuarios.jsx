import React, { useEffect, useState, useCallback } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { columns } from "@modules/Admin/utils/data";
import { INITIAL_VISIBLE_COLUMNS, capitalize } from "./utils/utils";
import { VerticalDotsIcon } from "../../components/VerticalDotsIcon.jsx";
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);
const TopContent = React.lazy(() =>
  import("./../../components/TopContent.jsx")
);
const BottomContent = React.lazy(() =>
  import("./../../components/BottonContent.jsx")
);
const ModalActualizarUsuarios = React.lazy(() =>
  import("./ModalActualizarUsuarios.jsx")
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
  const [isModalActualizarUsariosOpen, setIsModalActualizarUsariosOpen] =
    useState(false);
  const [idUsers, setIdUsers] = useState("");

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
      case "document":
        return <p className="py-2">{cellValue}</p>;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  textValue="Actualizar usuario"
                  onClick={() => {
                    setIdUsers(user.id_user);
                    setIsModalActualizarUsariosOpen(true);
                  }}
                >
                  <span className="flex justify-between group">
                    Actualizar Usuario{" "}
                    <i className=" rtl:rotate-180  transition-transform duration-300 ease-in-out group-hover:rotate-90 group-hover:scale-110 ri-refresh-line"></i>
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      <ModalActualizarUsuarios
        idUsers={Number(idUsers)}
        isModalActualizarUsariosOpen={isModalActualizarUsariosOpen}
        setIsModalActualizarUsariosOpen={setIsModalActualizarUsariosOpen}
      />
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
          emptyContent={"No hay usuarios para mostrar"}
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

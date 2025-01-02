import useQueryData from "@/components/custom-hook/useQueryData";
import Status from "@/components/partials/Status";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { Archive, ArchiveRestore, FilePenLine, Trash } from "lucide-react";
import React from "react";
import LoadMore from "../../partials/LoadMore";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import Loadmore from "@/components/partials/LoadMore";
import IconNoData from "../../partials/IconNoData";
import IconServerError from "../../partials/IconServerError";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableLoader from "../../partials/TableLoader";
import Pills from "../../partials/Pills";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import SpinnerTable from "../../partials/spinners/SpinnerTable";

const RoleList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setIsId] = React.useState("");
  const [dataItem, setDataItem] = React.useState("");

  let counter = 1;
  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.role_aid);
    setDataItem(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true)); //confirm
    setIsId(item.role_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true)); //confirm
    setIsId(item.role_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const {
    isLoading,
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/role`, //endpoint
    "get", //method
    "role" //key
  );
  return (
    <>
      <div className="mt-10 bg-secondary rounded-md p-4 border border-line relative">
        {isFetching && !isLoading && <SpinnerTable />}
        <div className="table-wrapper custom-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th className="w-[50%]">Role Name</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="100%">
                    <TableLoader count={20} cols={5} />
                  </td>
                </tr>
              )}
              {result?.count === 0 && (
                <tr>
                  <td colSpan={100}>
                    <IconNoData />
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={100}>
                    <IconServerError />
                  </td>
                </tr>
              )}

              {result?.count > 0 &&
                result.data.map((item, key) => (
                  <tr key={key}>
                    <td>{counter++}</td>
                    <td>
                      <Pills isActive={item.role_is_active} />
                    </td>
                    <td>{item.role_name}</td>
                    <td>{item.role_description}</td>
                    <td>
                      <ul className="table-action ">
                        {item.role_is_active ? (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Edit"
                                type="button"
                              >
                                <FilePenLine onClick={() => handleEdit(item)} />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Archive"
                                type="button"
                              >
                                <Archive onClick={() => handleArchive(item)} />
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Restore"
                                type="button"
                              >
                                <ArchiveRestore
                                  onClick={() => handleRestore(item)}
                                />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Delete"
                                type="button"
                              >
                                <Trash onClick={() => handleDelete(item)} />
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Loadmore />
        </div>
      </div>
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          mysqlApiDelete={`/v2/role/${id}`}
          queryKey={"role"}
          item={dataItem.role_name}
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/role/active/${id}`}
          queryKey={"role"}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/role/active/${id}`}
          queryKey={"role"}
        />
      )}
    </>
  );
};

export default RoleList;

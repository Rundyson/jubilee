import React from "react";
import LoadMore from "../partials/LoadMore";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import IconServerError from "../partials/IconServerError";
import TableLoader from "../partials/TableLoader";
import IconNoData from "../partials/IconNoData";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import Pills from "../partials/Pills";
import { StoreContext } from "@/components/store/storeContext";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsDelete,
  setIsEdit,
  setIsRestore,
} from "@/components/store/storeAction";
import ModalDelete from "../partials/modals/ModalDelete";
import ModalConfirm from "../partials/modals/ModalConfirm";
import useQueryData from "@/components/custom-hook/useQueryData";
import Status from "@/components/partials/Status";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalRestore from "@/components/partials/modal/ModalRestore";

const CategoryTable = ({ setItemEdit, setIsCategoryEdit, isCategoryEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isActive, setIsActive] = React.useState(0);
  const [id, setIsId] = React.useState("");

  let counter = 1;

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.category_aid);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsId(item.category_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsId(item.category_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(item);
  };

  const {
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/category`, //endpoint
    "get", //method
    "category" //key
  );

  return (
    <>
      <div className="mt-10 bg-secondary rounded-md p-4 border border-line relative">
        {/* <SpinnerTable/> */}
        <div className="table-wrapper custom-scroll">
          {/* <TableLoader count={10} cols={4}/> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th className="w-[50%]">Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                              <td colSpan={100}>
                                <IconNoData/>
                              </td>
                            </tr> */}
              {/* <tr>
                              <td colSpan={100}>
                                <IconServerError/>
                              </td>
                            </tr> */}
              {result?.count > 0 &&
                result.data.map((item, key) => (
                  <tr key={key}>
                    <td>{counter++}</td>
                    <td>
                      {item.category_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td>{item.category_title}</td>
                    <td>
                      <ul className="table-action ">
                        {item.category_is_active ? (
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
                                <Trash2 onClick={() => handleDelete(item)} />
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
          <LoadMore />
        </div>
      </div>
      {/* {store.isDelete && <ModalDelete/>} */}
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v2/category/${id}`}
          queryKey="category"
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/category/active/${id}`}
          queryKey={"category"}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/category/active/${id}`}
          queryKey={"category"}
        />
      )}

      {/* {store.isConfirm && (
                        <ModalConfirm
                        queryKey="category"
                        mysqlApiArchive={`/v2/category/active/${id}`}
                        active={isActive}/>
                        )} */}
      {/* {store.isView && <ModalViewMovie movieInfo={movieInfo}/>} */}
    </>
  );
};

export default CategoryTable;

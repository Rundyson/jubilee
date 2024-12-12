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
import { menus } from "../menu-data";
import useQueryData from "@/components/custom-hook/useQueryData";
import Status from "@/components/partials/Status";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalRestore from "@/components/partials/modal/ModalRestore";

const FoodTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setIsId] = React.useState("");

  let counter = 1;
  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.food_aid);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true)); //confirm
    setIsId(item.food_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true)); //confirm
    setIsId(item.food_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const {
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/food`, //endpoint
    "get", //method
    "food" //key
  );

  // React.useEffect(() => {
  //   dispatch(setIsSettingsOpen(true));
  // }, []);

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
                <th>Food Category</th>
                <th>Price</th>
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
              {/* {menus.map((item, key) => (
                              <tr key={key}>
                              <td>{counter++}</td>
                              <td><Pills/></td>
                              <td>{item.menu_title}</td>
                              <td>{item.menu_category}</td>
                              <td>{item.menu_price}</td>
                              <td>
                                <ul className="table-action " >
                                  {true ? (<>
                                  <li>
                                    <button className='tooltip' data-tooltip="Edit" onClick={() => handleEdit(item)}><FilePenLine /></button>
                                  </li>
                                  <li><button className='tooltip' data-tooltip="Archive" onClick={() => handleArchive()}><Archive/></button></li>
                                  </>) : (<>
                                    <li>
                                    <button className='tooltip' data-tooltip="Restore" onClick={() => handleRestore()}><ArchiveRestore /></button>
                                    </li>
                                  <li>
                                    <button className='tooltip' data-tooltip="Delete" onClick={() => handleDelete()}><Trash2 /></button>
                                    </li>
                                  </>)}
                                </ul>
                              </td>
                            </tr>
                            ))} */}

              {result?.count > 0 &&
                result.data.map((item, key) => (
                  <tr key={key}>
                    <td>{counter++}</td>
                    <td>
                      {" "}
                      {item.food_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td>{item.food_title}</td>
                    <td>{item.category_title}</td>
                    <td>P {item.food_price}</td>
                    <td>
                      <ul className="table-action ">
                        {item.food_is_active  ? (
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
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v2/food/${id}`}
          queryKey={"food"}
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/food/active/${id}`}
          queryKey={"food"}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/food/active/${id}`}
          queryKey={"food"}
        />
      )}
      {/* {store.isView && <ModalViewMovie movieInfo={movieInfo}/>} */}
    </>
  );
};

export default FoodTable;

import { setError, setIsAdd, setMessage } from '@/components/store/storeAction';
import React from 'react'
import SideNavigation from '../../partials/SideNavigation';
import Header from '../../partials/Header';
import { FaPlus } from 'react-icons/fa';
import RoleList from '../role/RoleList';
import Footer from '../../partials/Footer';
import ModalSuccess from '@/components/partials/modal/modalSuccess';
import ModalError from '../../partials/modals/ModalError';
import UserList from './DeveloperList';
import { StoreContext } from '@/components/store/storeContext';
import ModalAddDeveloper from './ModalAddDeveloper';
import DeveloperList from './DeveloperList';
import useQueryData from '@/components/custom-hook/useQueryData';

const Developer = () => {
      const [itemEdit, setItemEdit] = React.useState(null);
      const { dispatch, store } = React.useContext(StoreContext);

    
        const {
          isLoading,
          isFetching,
          error,
          data: role,
          status,
        } = useQueryData(
          `/v2/role`, //endpoint
          "get", //method
          "role" //key
        );

          const handleAdd = () => {
            if (developerRole?.length === 0) {
              dispatch(setError(true));
              dispatch(setMessage("Developer role ise required"));
              return;
            }
            setItemEdit(null);
            dispatch(setIsAdd(true));
          };

        const developerRole = role?.data.filter((item) => item.role_is_developer == 1);
        console.log(developerRole);
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="settings" />
          <main>
            <Header title="Developer" subtitle="Welcome to Jollibee" />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>
                {isFetching ? (
                  "Loading..."
                ) : (
                  <button
                    className="btn btn-add"
                    type="button"
                    onClick={handleAdd}
                  >
                    <FaPlus /> Add New
                  </button>
                )}
              </div>
              <DeveloperList setItemEdit={setItemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
      {store.isAdd && <ModalAddDeveloper itemEdit={itemEdit} developerRole={developerRole}/>}
    </>
  );
}

export default Developer
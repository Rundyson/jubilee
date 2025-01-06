import { setIsAdd } from '@/components/store/storeAction';
import React from 'react'
import SideNavigation from '../../partials/SideNavigation';
import Header from '../../partials/Header';
import { FaPlus } from 'react-icons/fa';
import RoleList from '../role/RoleList';
import Footer from '../../partials/Footer';
import ModalSuccess from '@/components/partials/modal/modalSuccess';
import ModalError from '../../partials/modals/ModalError';
import ModalAddRole from '../role/ModalAddRole';
import UserList from './UserList';
import { StoreContext } from '@/components/store/storeContext';

const User = () => {
      const [itemEdit, setItemEdit] = React.useState(null);
      const { dispatch, store } = React.useContext(StoreContext);

      const handleAdd = () => {
        setItemEdit(null);
        dispatch(setIsAdd(true));
      };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="settings" />
          <main>
            <Header title="User" subtitle="Welcome to Jollibee" />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>
                <button
                  className="btn btn-add"
                  type="button"
                  onClick={handleAdd}
                >
                  <FaPlus /> Add New
                </button>
              </div>
              <UserList setItemEdit={setItemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
      {store.isAdd && <ModalAddRole itemEdit={itemEdit} />}
    </>
  );
}

export default User
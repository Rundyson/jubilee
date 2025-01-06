import React from 'react'
import SideNavigation from '../../partials/SideNavigation';;
import Footer from '../../partials/Footer';
import RoleList from './RoleList';
import Header from '../../partials/Header';
import { StoreContext } from '@/components/store/storeContext';
import { setIsAdd } from '@/components/store/storeAction';
import { FaPlus } from 'react-icons/fa';
import ModalAddRole from './ModalAddRole';
import ModalSuccess from '@/components/partials/modal/modalSuccess';
import ModalError from '../../partials/modals/ModalError';

const Role = () => {
  const [itemEdit, setItemEdit] = React.useState(null);
  const {dispatch, store} = React.useContext(StoreContext);

  const handleAdd = () => {
    setItemEdit(null);
    dispatch(setIsAdd(true))
  }
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="settings" />
          <main>
            <Header title="Role" subtitle="Welcome to Jollibee" />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>
                <button className='btn btn-add' 
                type="button" 
                onClick={handleAdd}>
                  <FaPlus/> Add New
                </button>
              </div>
              <RoleList setItemEdit={setItemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>
      {store.success && <ModalSuccess/>}
      {store.error && <ModalError/>}
      {store.isAdd && <ModalAddRole itemEdit={itemEdit}/>}
    </>
  );
}

export default Role
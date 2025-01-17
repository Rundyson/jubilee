import Footer from "../partials/Footer";
import Header from "../partials/Header";
import SideNavigation from "../partials/SideNavigation";
import SettingsList from "./SettingsList";

const Settings = () => {
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="settings" />
          <main>
            <Header title="Settings" subtitle="Welcome to Jollibee" />
            <div className="p-5">
                <SettingsList/>
            </div>
            <Footer />
          </main>
        </div>
      </section>
    </>
  );
};

export default Settings;

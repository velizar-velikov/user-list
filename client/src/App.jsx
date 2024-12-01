import Header from './components/header/Header.jsx';
import UsersSection from './components/users-section/UsersSection.jsx';
import UserDetails from './components/user-details/UserDetails.jsx';
import CreateEdit from './components/create-edit/CreateEdit.jsx';
import Delete from './components/delete/Delete.jsx';
import Footer from './components/footer/Footer.jsx';

function App() {
    return (
        <>
            {/* Header component */}
            <Header />
            {/* Main component  */}
            <main className="main">
                {/* Section component  */}
                <UsersSection />

                {/* User details component  */}
                {/* <UserDetails /> */}

                {/* Create/Edit Form component  */}
                {/* <CreateEdit /> */}

                {/* Delete user component  */}
                {/* <Delete /> */}
            </main>
            {/* Footer component  */}
            <Footer />
        </>
    );
}

export default App;

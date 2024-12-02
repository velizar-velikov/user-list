import Header from './components/header/Header.jsx';
import UsersSection from './components/users-section/UsersSection.jsx';
import Delete from './components/delete/Delete.jsx';
import Footer from './components/footer/Footer.jsx';

function App() {
    return (
        <>
            <Header />

            <main className="main">
                <UsersSection />

                {/* Delete user component  */}
                {/* <Delete /> */}
            </main>

            <Footer />
        </>
    );
}

export default App;

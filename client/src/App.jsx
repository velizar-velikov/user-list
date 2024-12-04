import Header from './components/header/Header.jsx';
import UsersSection from './components/users-section/UsersSection.jsx';
import Footer from './components/footer/Footer.jsx';

function App() {
    return (
        <>
            <Header />

            <main className="main">
                <UsersSection />
            </main>

            <Footer />
        </>
    );
}

export default App;

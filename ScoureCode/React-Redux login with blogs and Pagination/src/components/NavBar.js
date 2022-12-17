import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">Blog App</Navbar.Brand>
                </Container>
            </Navbar>

        </>
    );
}

export default Navigation;
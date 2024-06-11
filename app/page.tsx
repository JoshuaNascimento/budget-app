import ClientsOnly from "./components/ClientsOnly";
import Container from "./components/Container";

export default function Home() {
  return (
    <ClientsOnly>
      <Container>
        <h1> Budget App </h1>
      </Container>
    </ClientsOnly>
  );
}

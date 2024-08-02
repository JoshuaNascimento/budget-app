import getUserTransaction from "./actions/getUserTransaction";
import ClientsOnly from "./components/ClientsOnly";
import Container from "./components/Container";
import Dashboard from "./components/dashboard/Dashboard";

export default async function Home() {

  const transData = await getUserTransaction();

  return (
    <ClientsOnly>
      <Container>
        <h1> Budget App </h1>
        <Dashboard transactions={transData}/>
      </Container>
    </ClientsOnly>
  );
}

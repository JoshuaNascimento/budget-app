import getUserCategories from "./actions/getUserCategories";
import getUserTransaction from "./actions/getUserTransaction";
import ClientsOnly from "./components/ClientsOnly";
import Container from "./components/Container";
import Dashboard from "./components/dashboard/Dashboard";

export default async function Home() {

  const transData = await getUserTransaction();
  const userCategories = await getUserCategories();

  return (
    <ClientsOnly>
      <Container>
        <h1> Budget App </h1>
        <Dashboard transactions={transData} categories={userCategories}/>
      </Container>
    </ClientsOnly>
  );
}

import { User } from "@prisma/client";  // Generated when running 'npx prisma db push'
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";


interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  
  return ( 
    <div className=" fixed w-full bg-white z-10 shadow-s,">
      <div 
        className="
        py-4
        border-b-[1px]
        "
      >
        <Container>
            <div 
              className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0
              "
            >
              <Logo/>
              <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
      </div>
    </div> 
  );
}
 
export default Navbar;
'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useUploadModal from "@/app/hooks/useUploadModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";


interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const uploadModal = useUploadModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  // Check if user is logged in when they attempt to import a file
  const onFileImport = useCallback(() => { 
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open Upload Modal
    uploadModal.onOpen();

  }, [currentUser, loginModal, uploadModal]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onFileImport}
          className="
          hidden
          md:block
          text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer
          "
        >
          Upload File
        </div>
        <div
          onClick={() => {toggleOpen()}}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          "
        >
          <AiOutlineMenu/>
        </div>
      </div>
      
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {/* Conditional Render if user is logged in */}
            {currentUser? (
            <>
              <MenuItem
                onClick={() => {}}
                label='Dashboard'
              />
              <MenuItem
                onClick={uploadModal.onOpen}
                label='Upload File'
              />
              <MenuItem
                onClick={() => {}}
                label='Budget Goals'
              />
              <MenuItem
                onClick={() => signOut()}
                label='Logout'
              />
            </>
            ) : (
            <>
              <MenuItem
                onClick={loginModal.onOpen}
                label='Login'
              />
              <MenuItem
                onClick={registerModal.onOpen}
                label='Sign up'
              />
            </>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
 
export default UserMenu;
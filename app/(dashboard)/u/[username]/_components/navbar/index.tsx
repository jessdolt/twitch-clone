import React from "react"
import { Logo } from "./logo"
import { Actions } from "./actions"

export const Navbar = () => {
  return (
    <nav className="fixed  w-full h-20 z-[49] top-0 bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Actions />
    </nav>
  )
}

"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-3xl font-semibold">
              Byte<span className="text-blue-500">Blog</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              className="text-sm font-medium hover:text-blue-500 transition-colors"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Auth Buttons */}
          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <p className="text-sm font-medium text-gray-500">{user.email}</p>
              <LogoutLink className={buttonVariants({ variant: "secondary" })}>
                Logout
              </LogoutLink>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <LoginLink className={buttonVariants()}>Login</LoginLink>
              <RegisterLink
                className={buttonVariants({ variant: "secondary" })}
              >
                Sign up
              </RegisterLink>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden transition-transform duration-200 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div
        className={`
          sm:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col gap-4 pb-4">
          <Link
            className="text-sm font-medium hover:text-blue-500 transition-colors"
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>

          {user ? (
            <>
              <p className="text-sm font-medium text-gray-500">{user.email}</p>
              <LogoutLink
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full",
                })}
              >
                Logout
              </LogoutLink>
            </>
          ) : (
            <>
              <LoginLink className={buttonVariants({ className: "w-full" })}>
                Login
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full",
                })}
              >
                Sign up
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

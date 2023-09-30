import { env } from "@/lib/env.mjs";
import "./globals.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${env.NEXT_PUBLIC_TITLE} Judging`,
  description: `Judging dashboard for ${env.NEXT_PUBLIC_TITLE}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        {children}

        <footer className="m-4 rounded-lg bg-gray-300 shadow dark:bg-gray-900">
          <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-base text-gray-700 dark:text-gray-400 sm:text-center">
              © 2023{" "}
              <a href="https://ieeemansb.org/" className="hover:underline">
                IEEE Mansoura Student Branch
              </a>
              . All Rights Reserved.
            </span>
            <p className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-0">
              Developed by &nbsp;
              <a
                href="https://github.com/HossamMohsen7"
                className="hover:underline"
              >
                Hossam Mohsen
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

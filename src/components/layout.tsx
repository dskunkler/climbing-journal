import Navbar from "./navbar";
// import Footer from "./footer";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Layout(prop: Props) {
  return (
    <>
      <Navbar />
      <main>{prop.children}</main>
      {/* <Footer /> */}
    </>
  );
}

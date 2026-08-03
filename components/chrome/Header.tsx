import TopBar from "./TopBar";
import Nav from "./Nav";

/** Server wrapper so the top bar stays server-rendered. */
export default function Header() {
  return (
    <>
      <TopBar />
      <Nav />
    </>
  );
}

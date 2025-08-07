import ToggleButton from "./togglebutton";
import { Container } from "@/components/container";

export default function Header() {
  return (
    <header className="bg-white dark:bg-blue-900 py-8 shadow-[_0px_10px_10px_-10px_rgba(33,35,38,0.1)]">
      <Container width="w-[min(90%,1500px)]">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-grey-950 dark:text-white">Where in the world?</p>
          <ToggleButton />
        </div>
      </Container>
    </header>
  );
}
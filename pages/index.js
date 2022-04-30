import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import IndexContent from "../components/indexContent";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex flex-wrap justify-center">
          <img
            src="/background.png"
            className="p-1 bg-white border rounded lg:max-w-sm md:max-w-xs sm: max-w-xs h-auto mx-5"
          />
          <div className="lg:text-6xl md:text-3xl sm: text-2xl self-center max-w-md font-sans lg:ml-28 sm:ml-5 text-center mx-2 font-bold">
            A <span className="text-green-500">perfect place</span> for{" "}
            <span className="text-red-500">&lt;coders/&gt;</span>
            to
            <span className="text-blue-500"> wear their code</span>
          </div>
        </div>
        <IndexContent />
      </main>
    </div>
  );
}

import AboutMe from "@/components/AboutMe";
import Contacts from "@/components/Contacts";
import HereSection from "@/components/HereSection"
import Projects from "@/components/Projects";

const Home = () => {
  return(
   <>
    <main className="max-w-7xl mx-auto px-6 lg:px-8">
      <HereSection/>
      <AboutMe/>
      <Projects/>
      <Contacts/>
    </main>


  </>
  );
};

export default Home
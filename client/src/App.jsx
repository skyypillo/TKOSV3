import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function useTextElements() {
  const [textElements, setTextElements] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p");
    setTextElements(Array.from(elements));
  }, [location]);

  return textElements;
}

function App() {
  const [isSpeakOn, setIsSpeakOn] = useState(false);
  const isSpeakOnRef = useRef(isSpeakOn);
  const textElements = useTextElements();

  const handleSwitchChange = () => {
    const newValue = !isSpeakOnRef.current;
    setIsSpeakOn(newValue);
    isSpeakOnRef.current = newValue;
  };

  const AddVA = async (txtSpeak) => {
    if (isSpeakOnRef.current) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const value = new window.SpeechSynthesisUtterance(txtSpeak);
      window.speechSynthesis.speak(value);
    }
  };

  const CancelSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    console.log(textElements);

    for (let i = 0; i < textElements.length; i++) {
      let element = textElements[i];

      if (
        element.textContent.length > 0 &&
        element.attributes.getNamedItem("txt") == null
      ) {
        element.addEventListener("mouseover", () => AddVA(element.textContent));
        element.addEventListener("mouseleave", CancelSpeaking);
      } else if (
        element.textContent.length == 0 ||
        element.attributes.getNamedItem("txt") != null
      ) {
        element.addEventListener("mouseover", () =>
          AddVA(element.attributes.getNamedItem("txt").textContent)
        );
        element.addEventListener("mouseleave", CancelSpeaking);
      }
    }
  }, [textElements]);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
      <Navbar />
      <Outlet context={{ isSpeakOn, handleSwitchChange }} />
      <Footer />
    </>
  );
}

export default App;

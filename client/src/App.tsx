import { Toaster } from "sonner";
import AppRoutes from "./routes/appRoutes";
import "@/config/i18n";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" duration={3000} toastOptions={{
        classNames: {
          default: "text-white! bg-[#262626]! border-[#3b3c3c]!",
        }
      }} />
    </>
  );
}

export default App;

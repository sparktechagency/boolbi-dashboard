import React from "react";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";

function App() {
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}
export default App;

import React from "react";
import ReactDOMServer from "react-dom/server";

import Chatbot from "@/components/chatbot/Chatbot";
import MicrosoftLoginButton from "@/components/auth/MicrosoftLoginButton";
import LoginForm from "@/components/login/LoginForm";

describe("Component SSR smoke", () => {
  const ssr = (node: React.ReactElement) => () => ReactDOMServer.renderToString(node);

  it("chatbot renders", ssr(<Chatbot />));
  it("ms login button renders", ssr(<MicrosoftLoginButton />));
  it("login form renders", ssr(<LoginForm />));
});



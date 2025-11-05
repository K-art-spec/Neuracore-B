import React from "react";
import ReactDOMServer from "react-dom/server";

// Import a subset of key pages to ensure they render without crashing on server
import HomePage from "@/app/page";
import LoginPage from "@/app/login/page";
import LeaderboardPage from "@/app/leaderboard/page";
import SubmitIdeaPage from "@/app/submit-idea/page";

describe("Pages SSR smoke render", () => {
  const renderToString = (el: React.ReactElement) => () => {
    ReactDOMServer.renderToString(el);
  };

  it("home page renders", renderToString(<HomePage />));
  it("login page renders", renderToString(<LoginPage />));
  it("leaderboard page renders", renderToString(<LeaderboardPage />));
  it("submit idea page renders", renderToString(<SubmitIdeaPage />));
});



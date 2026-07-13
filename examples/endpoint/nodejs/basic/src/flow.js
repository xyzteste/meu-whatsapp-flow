export const getNextScreen = async (decryptedBody) => {
  const { screen, data, action } = decryptedBody;

  console.log(
    "REQUEST:",
    JSON.stringify(decryptedBody, null, 2)
  );

  // Health Check
  if (action === "ping") {
    return {
      data: {
        status: "active"
      }
    };
  }

  // Primeira tela -> segunda tela
  if (action === "data_exchange" && screen === "WELCOME") {
    return {
      screen: "FORM",
      data: {
        greeting: "Seja Bem Vindo! 👋"
      }
    };
  }

  // Segunda tela -> tela final
  if (action === "data_exchange" && screen === "FORM") {
    return {
      screen: "SUCCESS",
      data: {
        name: data.name
      }
    };
  }

  throw new Error(
    `Unhandled request. action=${action} screen=${screen}`
  );
};

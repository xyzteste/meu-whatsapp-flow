export const getNextScreen = async (decryptedBody) => {
  const { screen, data, action } = decryptedBody;

  console.log(
    "REQUEST:",
    JSON.stringify(decryptedBody, null, 2)
  );

  if (action === "ping") {
    return {
      data: {
        status: "active"
      }
    };
  }

  if (action === "data_exchange" && screen === "WELCOME") {
    return {
      screen: "FORM",
      data: {
        greeting: "Seja Bem Vindo! 👋"
      }
    };
  }

  if (action === "data_exchange" && screen === "FORM") {
    return {
      screen: "OBRIGADO",
      data: {
        name: data.name
      }
    };
  }

  throw new Error(
    `Unhandled request. action=${action} screen=${screen}`
  );
};
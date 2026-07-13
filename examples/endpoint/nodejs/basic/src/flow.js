export const getNextScreen = async (decryptedBody) => {
  const { screen, data, action } = decryptedBody;

  console.log(JSON.stringify(decryptedBody, null, 2));

  if (action === "ping") {
    return {
      data: {
        status: "active"
      }
    };
  }

  if (action === "data_exchange") {

    // Tela inicial
    if (screen === "WELCOME") {
      return {
        screen: "MY_SCREEN",
        data: {
          greeting: "Hey there! 👋"
        }
      };
    }

    // Tela do formulário
    if (screen === "MY_SCREEN") {
      return {
        screen: "SUCCESS",
        data: {
          username: data.name
        }
      };
    }
  }

  throw new Error("Unhandled request");
};
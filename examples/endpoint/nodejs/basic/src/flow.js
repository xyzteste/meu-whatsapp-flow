export const getNextScreen = async (decryptedBody) => {
  const { screen, data, action, flow_token } = decryptedBody;

  console.log("REQUEST:", JSON.stringify(decryptedBody, null, 2));

  // 1. Health check obrigatório pro Meta
  if (action === "ping") {
    return {
      data: {
        status: "active",
      },
    };
  }

  // 2. Tratamento de erro: INIT do Flow
  if (action === "INIT") {
    return {
      screen: "WELCOME",
      data: {}
    };
  }

  // 3. WELCOME -> FORM
 
  if (action === "data_exchange" && screen === "WELCOME") {
	  const now = new Date();

	  const dataFormatada = now.toLocaleDateString("pt-BR", {
		timeZone: "America/Sao_Paulo"
	  });

	  const horaFormatada = now.toLocaleTimeString("pt-BR", {
		timeZone: "America/Sao_Paulo",
		hour: "2-digit",
		minute: "2-digit"
	  });

	  return {
		screen: "FORM",
		data: {
		  greeting: `Hoje é dia ${dataFormatada}, às ${horaFormatada} horas. Seja Bem Vindo!! 👋`
		}
	  };
	}

  // 4. FORM -> FINAL_TESTE
  if (action === "data_exchange" && screen === "FORM") {
    const userName = data?.name?.trim();
    
    if (!userName) {
      return {
        error_message: "Por favor, digite seu nome para continuar."
      }
    }

    // Aqui você salva no banco, manda pra CRM, etc
    // await saveToDatabase({ name: userName, flow_token });

    return {
      screen: "FINAL_TESTE",
      data: {
        name: userName
      }
    };
  }

  // 5. Log do erro antes de lançar
  console.error(`Unhandled request. action=${action} screen=${screen}`, decryptedBody);
  throw new Error(`Unhandled request. action=${action} screen=${screen}`);
};
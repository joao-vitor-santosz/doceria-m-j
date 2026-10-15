export type CepAddress = {
  street: string;
  neighborhood: string;
  city: string;
};

type ViaCepResponse = {
  erro?: boolean | string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
};

// Retorna null quando o CEP não existe; lança erro em falhas de rede ou do serviço.
export async function fetchAddressByCep(cepDigits: string, signal?: AbortSignal): Promise<CepAddress | null> {
  const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`, { signal });

  if (!response.ok) throw new Error(`ViaCEP respondeu com status ${response.status}.`);

  const data = (await response.json()) as ViaCepResponse;

  if (data.erro) return null;

  return {
    street: data.logradouro ?? "",
    neighborhood: data.bairro ?? "",
    city: data.localidade && data.uf ? `${data.localidade} - ${data.uf}` : (data.localidade ?? ""),
  };
}

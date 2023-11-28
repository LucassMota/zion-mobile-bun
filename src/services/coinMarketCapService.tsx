import axios from "axios";

const CMC_API_URL = process.env.EXPO_PUBLIC_COIN_MKT_CAP_API_URL;
const CMC_API_KEY = process.env.EXPO_PUBLIC_COIN_MKT_CAP_API_KEY || '';

function getCMCAxiosConfig() {
    return {
        headers: { 'X-CMC_PRO_API_KEY': CMC_API_KEY },
    };
}


export async function fetchValues() {
    try {
        const urlApi = `${CMC_API_URL}/v1/cryptocurrency/listings/latest?sort=market_cap&cryptocurrency_type=all&tag=all`;
        const response = await axios.get(urlApi, getCMCAxiosConfig());
        return response.data;
    } catch (error) {
        // Trate o erro de alguma forma, como lançando uma exceção personalizada ou registrando-o
        console.error('Erro na solicitação:', error);
        throw new Error('Erro na solicitação da API CoinMarketCap');
    }
}

export async function historicalQuote(id: number) {
    try {
        const urlApi = `${CMC_API_URL}/v2/cryptocurrency/quotes/historical?interval=24h&convert=BRL&id=${id}`;
        const {data} = await axios.get(urlApi, getCMCAxiosConfig())
        return data;
    } catch (e) {
        console.error('Erro na solicitação:', e);
        throw new Error('Erro na solicitação da API CoinMarketCap');
    }
}
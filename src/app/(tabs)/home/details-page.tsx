import {Stack, useLocalSearchParams} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useQuery} from "react-query";
import {historicalQuote, fetchValues} from "@/services/coinMarketCapService";
import {VictoryBar, VictoryChart, VictoryLine} from "victory-native";

export default function Index() {

    const params = useLocalSearchParams();
    const idCrypto = parseInt(params.idCrypto as string)
    const nameCrypto = params.name
    let quotes = []

    const state = {
        zoomDomain: {x: [new Date(1990, 1, 1), new Date(2009, 1, 1)]}
    };

    const {data: history, isLoading, isError, error} = useQuery(
        ["historical", idCrypto],
        () => historicalQuote(idCrypto),
        {
            retry: 1,
            refetchOnWindowFocus: true
        })

    if (isError) {
        return (
            <>
                <View style={styles.container}>
                    <Text> {idCrypto}</Text>
                    <Text> Erro... </Text>
                </View>
            </>
        )
    }

    if (history !== undefined) {
        quotes = history.data[idCrypto].quotes;
    }
    console.log('history: ', history)


    // function renderQuotes(quotes: any) {
    //     const quoteElements = [];
    //
    //     for (const key in quotes) {
    //         const quote = quotes[key];
    //
    //         const usdQuote = quote.quote.USD;
    //         const {price, volume_24h, market_cap, circulating_supply} = usdQuote;
    //
    //         const quoteText = `Price: $${price}\nVolume 24h: $${volume_24h}\nMarket Cap: $${market_cap}\nCirculating Supply: ${circulating_supply}`;
    //
    //         quoteElements.push(
    //             <Text key={key}>{quoteText}</Text>
    //         );
    //     }
    //     return quoteElements;
    // }

    function renderChart(quotes: any) {
        let data: any[] = []
        quotes.map((item: any, index: number) => {
            data.push({time: index, price: item.quote.BRL.price})
        })

        return (
            <View style={styles.container}>
                <VictoryChart
                    width={400}>
                    <VictoryBar data={data} x="time" y="price"/>
                </VictoryChart>
                <VictoryChart
                    width={400}>
                    <VictoryLine
                        style={{
                            data: {stroke: "tomato"}
                        }}
                        data={data} x="time" y="price"/>
                </VictoryChart>
            </View>
        );
    }

    if (isLoading || history === undefined) {
        return (
            <>
                <View style={styles.container}>
                    <Text> Loading...</Text>
                </View>
            </>
        )
    }


    return (
        <>
            <Stack.Screen options={{headerShown: true, title: `Details ${nameCrypto}`}}/>
            <View style={styles.container}>
                <Text>{nameCrypto} - {idCrypto}</Text>

                <ScrollView>
                    {/*{renderQuotes(quotes)}*/}
                    {renderChart(quotes)}
                </ScrollView>
                <StatusBar style="auto"/>
            </View>
        </>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
import {Stack, Link, router} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useQuery, useQueryClient} from "react-query";
import {fetchValues} from "@/services/coinMarketCapService";

export default function Index() {

    const {data: latest, isLoading, isError, error} = useQuery(
        'getInfo',
        fetchValues,
        {
            retry: 2,
            refetchOnWindowFocus: true
        })

    if (isError) {
        return (
            <>
                <View style={styles.container}>
                    {/*<Text> Erro... {error} </Text>*/}
                </View>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <View style={styles.container}>
                    <Text> Loading...</Text>
                </View>
            </>
        )
    }

    function handlerDetail(item: any) {

        router.push({
            pathname: "/home/details-page",
            params: {
                idCrypto: item.id,
                name: item.name
            }})
    }

    return (
        <>
            <Stack.Screen options={{headerShown: true, title: "Lista Cryptos"}}/>
            <View style={styles.container}>
                <Text style={{margin: 50}}>Index - HomeTab</Text>
                <StatusBar style="auto"/>
                <Text style={{marginBottom: 20}}>Qtd: {latest.data.length}</Text>
                <ScrollView style={{marginHorizontal: 10}}>
                    {latest.data.map((item: any, i: number) => {
                        return (

                            <Text
                                onPress={() =>handlerDetail(item)}
                                style={{marginBottom: 20, color: 'red'}}
                                key={i}>{i} - {item.name} - {item.symbol} - { item.id}</Text>
                        )
                    })}

                </ScrollView>
                {/*<Link href={"/home/details-page"}>*/}
                {/*    <Text>Go to Detail Page</Text>*/}
                {/*</Link>*/}
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
import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
// import { IoMdHome } from "react-icons/io";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
    IoIosStar,
    IoLogoWindows,
    IoLogoApple,
    IoLogoTux,
  } from "react-icons/io";

function GameScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.games}>
                <View style={styles.banner}></View>
                <View style={styles.layoutContainer}>
                    <View style={styles.productBasicInfo}>
                        <Text style={styles.productMainTitle}>Nome do Jogo</Text>
                        <View style={styles.productWrapper}>
                            <View style={styles.productRating}>
                                <IoIosStar style={styles.productIcon}/>
                                <Text>/5</Text>
                            </View>
                            <View style={styles.productSeparator}></View>
                            <View style={styles.productOsSupport}>
                                {<IoLogoWindows />}
                                {<IoLogoApple />}
                                {<IoLogoTux />}
                            </View>
                            <View style={styles.productSeparator}></View>
                            <View style={styles.productLanguages}></View>
                        </View>
                        <View style={styles.purchaseCard}>
                            <View style={offerHeader}>
                                <Text style={offerLabel}>Offer ends on:</Text>
                                <Text style={offerDate}></Text>
                            </View>
                            <View style={styles.purchaseContent}>
                                <View style={styles.discountBadge}></View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.originalPrice}>R$</View>
                                    <View style={styles.currentPrice}>R$</View>
                                    <View style={styles.currentPrice}>R$</View>
                                </View>
                                <View style={styles.actionButtons}>
                                    <Button style={styles.boughtBtn} disabled>
                                        Comprado
                                    </Button>
                                    <>
                                        <Button style={styles.addToCartBtn} disabled>
                                            
                                        </Button>
                                        <Button style={styles.buyNowBtn} disabled>
                                            
                                        </Button>
                                    </>
                                </View>

                            </View>
                        </View>
                        <View style={styles.gameDescription}>
                            <View style={styles.carouselOuterContainer}>
                                <View style={styles.carouselMiddleContainer}>
                                    <View style={styles.carouselInnerContainer}>
                                        <View  style={styles.carouselTrack}></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
   
})
export default GameScreen;
import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';


const Loading = () => {

    return (    
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFF" />
        </View>

    );
}
  
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }
});

  export default Loading;
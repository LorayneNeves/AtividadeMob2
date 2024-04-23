import React, { useState, useEffect, Fragment  } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, useWindowDimensions } from 'react-native';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native'
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';
import Loading from '../../components/Loading';

const SkeletonExemplo = () => {
  const navigation = useNavigation<StackTypes>();

  const [loading, setLoading] = useState(true);
  const { height , width} = useWindowDimensions();

  // Simulando um tempo de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000 milissegundos (2 segundos)
    return () => clearTimeout(timer);
  }, []);

  // Função para renderizar o esqueleto
  const renderSkeleton = () => (
    <ContentLoader
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor='#333'
    foregroundColor='#999'
  >
  
      {/* Coloque aqui o layout do esqueleto */}
      <Circle cx="36" cy="36" r="36" />      
      <Rect x="80" y="10" rx="4" ry="4" width={200} height={14} />
      <Rect x="80" y="30" rx="4" ry="4" width={200} height={14} />
      <Rect x="80" y="50" rx="4" ry="4" width={200} height={14} />
      {/* Um exemplo de esqueleto de carregamento */}
    </ContentLoader>
  );

  // Se ainda estiver carregando, exiba o esqueleto
  if (loading) {
    return <View style={styles.container}>{renderSkeleton()}</View>
   // return <Loading />
  }

  // Caso contrário, renderize o conteúdo real
  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <View>
        <Text>Id: 1</Text>
        <Text>Nome: H1</Text>
        <Text>Senha: 123</Text>    
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop:10
  },
  header:{
    
    flexDirection:"row",
    alignItems:"center",
    paddingLeft: 60,
    paddingRight: 10,
    marginTop:8

  },
  skeletonItem: {
    width: 200,
    height: 20,
    backgroundColor: '#dcdcdc',
    marginBottom: 10,
  },
  contentItem: {
    width: 200,
    height: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  avatar:{
    height:64,
    width:64,
    borderRadius: 32
  }
});

export default SkeletonExemplo;
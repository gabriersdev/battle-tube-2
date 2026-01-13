'use client';

import React from 'react';
import {motion, Variants} from 'framer-motion';
import {ScreenData} from '@/resources/presentation';
import {ScreenItem} from './screen-item';
import {Container, Row, Col} from 'react-bootstrap';

interface ScreenProps {
  data: ScreenData;
  isPlaying?: boolean;
}

// Variantes para o container da tela (entrada/saída global)
export const screenVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: (custom: { backgroundColor?: string }) => ({
    y: 0,
    opacity: 1,
    backgroundColor: custom.backgroundColor || 'transparent', // Anima a cor de fundo se fornecida
    transition: {
      duration: 1,
      when: 'beforeChildren',
    }
  }),
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  }
};

// Variantes para o container interno dos itens (controle de stagger)
export const contentVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const Screen: React.FC<ScreenProps> = ({data, isPlaying = true}) => {
  const isScreen1 = data.id === "screen-1";

  return (
    <motion.div
      key={data.id}
      custom={{backgroundColor: data.backgroundColor}} // Passa a cor customizada para as variantes
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-100 min-vh-100 d-flex align-items-center justify-content-center py-5 ${data.backgroundClassName || ''}`}
      style={{
        // Se não houver animação de cor, podemos definir aqui também como fallback ou inicial
        // Mas a variante 'animate' cuidará da transição suave
        backgroundColor: data.backgroundColor || 'transparent'
      }}
    >
      <Container fluid={isScreen1 ? true : "md"} className="h-100 d-flex flex-column justify-content-center">
        <motion.div
          variants={contentVariants}
          className="w-100"
        >
          <Row className="w-100 justify-content-center">
            <Col
              xs={12}
              md={isScreen1 ? 12 : 10}
              lg={isScreen1 ? 12 : 8}
              // Removido position-absolute que causava conflito com animações do Framer Motion
              // Usamos layout flexbox e grid fluido para centralizar e dimensionar corretamente
              className={`d-flex flex-column w-100 ${isScreen1 ? "mx-auto ms-xl-5 ps-xl-5" : ""}`}
              style={isScreen1 ? {maxWidth: '1500px'} : {}}
            >
              {data.items.map(item => <ScreenItem key={item.id} item={item} isPlaying={isPlaying}/>)}
            </Col>
          </Row>
        </motion.div>
      </Container>
    </motion.div>
  );
};
